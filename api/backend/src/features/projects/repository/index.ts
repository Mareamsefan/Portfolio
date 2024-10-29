import { Result } from '@/lib/Result';
import {Prisma as PrismaType } from '@/client/db'
import { CreateProject, Project, ProjectDB, UpdateProject} from '@/features/projects/types';
import { createProject, projectFromDb, projectToDb, updateProjectToDb } from '../mappers';
import { createReadStream } from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '@/client/db'

type ProjectRepository = {
  //exist: (id: string) => Promise<boolean>
  getById: (id: string) => Promise<Result<Project>>; 
  list: (query?: Record<string, string>) => Promise<Result<Project[]>>; 
  create: (data: CreateProject) => Promise<Result<string>>; 
  update: (data: UpdateProject) => Promise<Result<Project>>; 
  remove: (id: string) => Promise<Result<string>>; 
}

export const createProjectRepository = (prisma:PrismaType): ProjectRepository => {

  const exist = async (id: string): Promise<boolean> => {
    const projectCount =  await prisma.project.count({
      where: { id }, 
    }); 
    return projectCount > 0; 
  }

  const getById = async (id: string): Promise<Result<Project>> => {
    try {
        const projectExists = await exist(id); 
        if (!projectExists) {
          return {
            success: false, 
            error: {
              code: 'NOT_FOUND', message: 'Project not found'
            }
          };    
        }

        const data = await prisma.project.findUnique({
          where: {id}, 
        }); 
 
        if (!data) {
          return {
            success: false, 
            error: {
              code: 'NOT_FOUND',
              message: 'Project not found'
            }
          };
        }

        return {
          success: true, 
          data: projectFromDb(data)
        };
       
    }catch(error){
      return {
        success: false, 
        error: {
          code: 'INTERNAL_SERVER_ERROR', 
          message: 'Failed to retrieve projects'
        }, 
      }; 
    }
  }


  const create = async (data: CreateProject): Promise<Result<string>> =>{
    try{
      const projectToDbData = createProject(data); 

      const createdProject = await prisma.project.create({
        data: projectToDbData, 
      }); 

      return {
        success: true, 
        data: createdProject.id, 
      }; 
    } catch(error){
      return {
        success: false, 
        error: {
          code: 'INTERNAL_SERVER_ERROR', 
          message: 'Failed creating project', 
        },
      }; 
    }
  };  
   
  
  const list = async (params?: Record<string, string>): Promise<Result<Project[]>> => {
    try {
      // Bygg en filtreringsklausul basert på parametere for userId, publishedAt, og name
      const whereClause:  Prisma.ProjectWhereInput = {
        ...(params?.name ? { name: { contains: params.name } } : {}),
        ...(params?.userId ? { userId: params.userId } : {}),
        ...(params?.published ? { publishedAt: { not: null } } : {}), // published er satt til true om prosjektet er publisert
      };
  
      // Hent prosjekter fra databasen basert på filteret
      const projects = await prisma.project.findMany({
        where: whereClause,
      });
      
      const projectsFromDB = projects.map((project:ProjectDB) => projectFromDb(project));
      
      return {
        success: true,
        data: projectsFromDB,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve projects",
        },
      };
    }
  };
  

  const update = async (data: UpdateProject): Promise<Result<Project>> => {
    try {
      const projectExist = await exist(data.id)

      if (!projectExist){
        return {
          success: false, 
          error: {
            code:'NOT_FOUND', 
            message: 'Project not found'
          }
        }
      }
      const project = updateProjectToDb(data)

      const updatedProject = await prisma.project.update({
        where: {id: data.id}, 
        data: {
          name: project.name,
          updatedAt: project.updatedAt
        }
      }); 

      return {
        success: true, 
        data: projectFromDb(updatedProject), 
      }; 
    } catch (error) {
      return {
        success: false, 
        error: {
          code: 'INTERNAL_SERVER_ERROR', 
          message: 'Error while updating project'
        }, 
      }; 
    }
  }; 

  const remove = async (id: string): Promise<Result<string>> => {
    try {

      const projectExist = await exist(id); 

      if(!projectExist) {
        return {
          success: false, 
          error: {
            code: 'NOT_FOUND', 
            message: 'Project not found'
          },
        }; 
      }

     await prisma.project.delete({
      where: { id }, 
     }); 

     //for å bekrefte slettingen returner id til den slettende projekten
     return {
      success: true, 
      data: id, 
     };      
    
    } catch (error) {
      return {
        success: false, 
        error: {
          code: 'INTERNAL_SERVER_ERROR', 
          message: 'Error while deleting project'
        },
      }; 
    }
  }; 

  return {
   // exist,
    getById, 
    list, 
    create, 
    update, 
    remove
  }
}; 

export const projectRepository = createProjectRepository(prisma); 

export type {ProjectRepository}; 