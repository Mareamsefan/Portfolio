import { Result } from '@/lib/Result';
import prisma, { Prisma } from '@/client/db'
import { Project} from '@/features/projects/types';

type ProjectRepository = {
  list: (query?: Record<string, string>) => Promise<Result<Project>>; 
  create: (data: Project) => Promise<Result<Project>>; 
}

export const createProjectRepository = (prisma: Prisma): ProjectRepository => {

  const create = (data: Project) => {
    try{
      //TODO: LAGE EN MAPPER FOR PROJECT 
      /*Deretter etterligne noe som dette: 
  export const createStudentRepository = (db: DB): StudentRepository => {
  const create = (data: Student) => {
    try {
      const studentToDb = {
        id: data.id,
        name: data.name,
        created_at: data.createdAt,
        updated_at: data.updatedAt,
      };

      const query = db.prepare(`
      INSERT INTO students (id, name, created_at, updated_at) 
      VALUES (?, ?, ?, ?)
      `);

      const result = query.run(
        studentToDb.id,
        studentToDb.name,
        studentToDb.created_at,
        studentToDb.updated_at
      ) ;

      result.created_at

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed creating student",
        },
      };
    }
  };

  return {
    list: () => {},
    create,
  };
};
// Eksporterer studentRepository som en instans av createStudentRepository
// For å sikre at vi ikke må importere DB etc andre steder i koden
export const studentRepository = createStudentRepository({});

/*
{
  success: false,
  error: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Failed creating student",
  },
};
}*/

    }
  }

  return {
    list() => {}, 
    create
  }
}

