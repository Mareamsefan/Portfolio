import { Result } from "@/lib/Result";
import { projectRepository, ProjectRepository } from "../repository";
import { CreateProject, Project, UpdateProject, validateCreateProject, validateProject } from "../types";
import { createProject, updateProjectToDb } from "../mappers";


 export const createProjectService = (projectRepository: ProjectRepository) => {
    
    const getById = async (id: string): Promise<Result<Project>> => {
        return projectRepository.getById(id); 
    }

    const list = async (params?: Record<string, string>): Promise<Result<Project[]>> => {
        const result = await projectRepository.list(params); 
        if (!result.success) return result; 

        return{
            ...result, 
            data: result.data
        }
    }

    const create = async (data: CreateProject): Promise<Result<string>> => {
        return projectRepository.create(data)

    }

    const update = async (data: UpdateProject): Promise<Result<Project>> => {
    
        if (!validateProject(data).success){
            return {
                success: false, 
                error: {
                    code: 'BAD_REQUEST', 
                    message: 'Invalid project data'
                },
            }; 
        }
        return projectRepository.update(data); 
    }

    const remove = async (id: string): Promise<Result<string>> =>{
        return projectRepository.remove(id); 
    }

    return {
        list,
        create,
        update,
        getById,
        remove,
      };
    
 }; 
 
export const projectService = createProjectService(projectRepository);

export type  ProjectService = ReturnType<typeof createProjectService>;