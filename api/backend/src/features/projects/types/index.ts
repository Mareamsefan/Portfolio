import { z } from "zod";


// Zod schema for the Project
export const projectsValidateSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name should have at least 3 characters'),
  description: z.string().min(10, 'Description should have at least 10 characters'),
  startDate: z.date(),
  endDate: z.date().nullable(),
  publishedAt: z.date().nullable(),
  updatedAt: z.date().nullable(),  
  status: z.string(), 
  githubRep: z.string().url('Invalid GitHub URL'),
  userId: z.string().nullable(),
  tags: z.array(z.string()).min(1, `At least one language is required`), 
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  frameworks: z.array(z.string()).min(1, 'At least one framework is required'),
  pictureURLs: z.array(z.string().url('Invalid URL')),
});

export const projectsSchema = z.object({
  id: z.string(),
  name: z.string(), 
  description: z.string(), 
  startDate: z.date(),
  endDate: z.date().nullable(),
  publishedAt: z.date().nullable(),
  updatedAt: z.date().nullable(), 
  status: z.string(), 
  githubRep: z.string(),
  userId: z.string().nullable(),
  tags: z.array(z.string()), 
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  pictureURLs: z.array(z.string()),
});
//Zod schema for the Project in DB
export const projectsSchemaDB = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date().nullable(),
  publishedAt: z.date().nullable(),
  updatedAt: z.date().nullable(), 
  status: z.string(), 
  githubRep: z.string(),
  userId: z.string().nullable(),
  tags: z.string(), 
  languages: z.string(),
  frameworks: z.string(),
  pictureURLs: z.string(),

});



// Schema for creating a new Project (omit `id`,  `publishedAt` and `userId` )
export const projectsCreateSchema = projectsSchema.omit({ id: true, publishedAt: true, userId: true, updatedAt: true});

export const projectsUpdateSchema = projectsSchema.omit({ 
  updatedAt: true,
});


// Extract TypeScript types from the Zod schemas
export type Project = z.infer<typeof projectsSchema>;
export type CreateProject = z.infer<typeof projectsCreateSchema>;
export type UpdateProject = z.infer<typeof projectsUpdateSchema>; 
export type ProjectDB = z.infer<typeof projectsSchemaDB>

// for å validere data fra frontend: 
export const validateProject = (data: unknown) => {
  return projectsValidateSchema.safeParse(data); 
}
// for å validere data fra frontend: 
export const validateCreateProject = (data: unknown) => {
  return projectsCreateSchema.safeParse(data); 
}