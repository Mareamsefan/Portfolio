import {z} from "Zod"; 


export const usersSchema = z.object({
    id: z.string(), 
    name: z.string(), 
    degree: z.string(), 
    points: z.number(), 
    email: z.string().nullable(), 
    pictureURL: z.string().nullable(), 
    experiences: z.array(z.string()), 

})
export const usersSchemaDB = z.object({
    id: z.string(), 
    name: z.string(), 
    degree: z.string(), 
    points: z.number(), 
    email: z.string().nullable(), 
    pictureURL: z.string().nullable(), 
    experiences: z.string()

})

// Schema for creating a new User (omit `id`)
export const usersCreateSchema = usersSchemaDB.omit({ id: true});


export type User = z.infer<typeof usersSchema>
export type CreateUser = z.infer<typeof usersCreateSchema>;
export type UserDB = z.infer<typeof usersSchemaDB>

export const validateUser = (data: unknown) => {
    return usersSchema.safeParse(data); 
}