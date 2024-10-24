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
      
    }
  }
  return {
    list() => {}, 
    create
  }
}

