import { z } from "zod";

// Define the Experience schema
export const ExperienceSchema = z.object({
    name: z.string().min(3, "Experience name should be at least 3 characters"),
  });
  
  // Define Student schema based on your structure
  export const StudentSchema = z.object({
    name: z.string().min(3),
    degree: z.string(),
    points: z.number(),
    email: z.string().email().optional(),
    pictureURL: z.string().url().optional(),
    experiences: z.array(ExperienceSchema).optional(),
  });

export type Student = z.infer<typeof StudentSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
