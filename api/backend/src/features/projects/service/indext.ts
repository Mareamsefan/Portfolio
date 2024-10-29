
// her skal du kun sende videre data til rep, kanskje kan du validere dersom du ikke gjør det i controller

import { Result } from "@/lib/Result";
import { projectRepository, ProjectRepository } from "../repository";
import { CreateProject, Project, UpdateProject, validateProject } from "../types";
import { createProject, updateProjectToDb } from "../mappers";

/*TODO: Skrive om servicelaget, ved å fjerne map, for map skal brukes i repo, men heller bare sende 
 videre repo til controller, kan se noe slik ut: (HUSK å bruke valideringsmetodene som liger i types her i service)
 https://github.com/mariuswallin/hiof-webapp-2024/blob/main/demos/classlist/backend/src/features/students/student.service.ts
 */

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
        if (!validateProject(data).success){
            return {
                success: false, 
                error: {
                    code: 'BAD_REQUEST', 
                    message: 'Invalid project data'
                }, 
            }; 
        }
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