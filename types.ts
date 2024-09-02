import { UUID } from "crypto";

import {z} from "zod"; 


// Definerer et Zod-skjema for Project: 
export const ProjectSchema = z.object ({
    id: z.string(),
    projectName: z.string(), 
    roleAndResponsibilities: z.string(), 
    projectDescription: z.string(),
    languagesUsed: z.array(z.string()), 
    frameworksUsed: z.array(z.string()), 
    startDate: z.coerce.date(), 
    githubRepository: z.string(), 
    pictureURL: z.string()
})

//Definerer et Zod-skjema for å opprette et nytt Project: 

export const ProjectCreateSchema = ProjectSchema.omit({id: true}); 

//Definerer et Zod-skjema for en array av projects: 
export const ProjectArraySchema = z.array(ProjectSchema); 

// Oppdatert type-definisjon basert på Zod-skjemaet:
export type Project = z.infer<typeof ProjectSchema>; 

// Oppdatert type-definisjon basert på Zod-skjemaet: 
export type CreateProject = z.infer<typeof ProjectCreateSchema>; 

type ProjectObject = {
    id: UUID; 
    projectName: string; 
    roleAndResponibilities: string; 
    projectDescription: string; 
    githubRepository: string; 
    languagesUsed: string[]; 
    frameworkUsed: string[]; 
    startDate: Date | string; 
    pictureURL: string; 

}; 
