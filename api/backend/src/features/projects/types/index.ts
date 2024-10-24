import { z } from "zod";


// Zod schema for the Project
export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name should have at least 3 characters'),
  description: z.string().min(10, 'Description should have at least 10 characters'),
  startDate: z.date(),
  endDate: z.date(),
  publishedAt: z.date().nullable(),
  status: z.string(), 
  githubRep: z.string().url('Invalid GitHub URL'),
  tags: z.array(z.string()).min(1, `At least one language is required`), 
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  frameworks: z.array(z.string()).min(1, 'At least one framework is required'),
  pictureURLs: z.array(z.string().url('Invalid URL')),
});

// Schema for creating a new Project (omit `id`,  `publishedAt` and `endDate` )
export const ProjectCreateSchema = ProjectSchema.omit({ id: true, publishedAt: true});


// Extract TypeScript types from the Zod schemas
export type Project = z.infer<typeof ProjectSchema>;
export type CreateProject = z.infer<typeof ProjectCreateSchema>;
