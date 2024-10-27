import { Result } from '@/lib/Result';
import { Prisma } from '@/client/db'
import { Project, ProjectDB} from '@/features/projects/types';
import { createProject, projectToDb } from '../mappers';
import { createReadStream } from 'fs';

type ProjectRepository = {
  list: (query?: Record<string, string>) => Promise<Result<ProjectDB>>; 
  create: (data: Project) => Promise<Result<Project>>; 
}

export const createProjectRepository = (prisma: Prisma): ProjectRepository => {

  const create = async (data: Project): Promise<Result<ProjectDB>> =>{
    try{
      const projectToDbData = createProject(data); 

      const createdProject = await prisma.project.create({
        data: projectToDbData, 
      }); 

      return {
        success: true, 
        data: createdProject, 
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
   


  return {
    list, 
    create
  }; 
}; 

