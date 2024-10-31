
import { Project, CreateProject, UpdateProject, validateProject,} from '@/features/projects/types';
import { z } from 'zod';
import { Hono } from 'hono';
import { errorResponse, type ErrorCode } from "@/lib/error";
import { ProjectService, projectService } from '../service/indext';
import { createProject } from '../mappers';

// Oppretter project controller
export const createProjectController = (projectService: ProjectService) => {
  const app = new Hono();

  // Henter et prosjekt basert på ID
  app.get('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await projectService.getById(id);

    if (!result.success) {
      return errorResponse(c, result.error.code as ErrorCode, result.error.message);
    }

    return c.json(result);
  });

  // Henter en liste over prosjekter med filtrering
  app.get('/', async (c) => {
    const query = c.req.query();
    const result = await projectService.list(query);

    if (!result.success) {
      return errorResponse(c, result.error.code as ErrorCode, result.error.message);
    }

    return c.json(result);
  });

  // Oppretter et nytt prosjekt
  app.post('/', async (c) => {
    // const user = c.get('user'); 
    const data = await c.req.json();
   
   console.log(`${JSON.stringify(data, null, 2)}`); 
   if (data.endDate) {
       data.endDate = new Date(data.endDate);
    }  
    if (data.startDate) {
    data.startDate = new Date(data.startDate);
    }
    //const project = createProject()
    const validation = validateProject(data);
    if (!validation.success) {
      console.log(validation.error)
      return errorResponse(c, 'BAD_REQUEST', 'Invalid project data');
      
    }
  

    const result = await projectService.create(
      data
      // Legger til autentisert bruker-ID
    );

    if (!result.success) {
      return errorResponse(c, result.error.code as ErrorCode, result.error.message);
    }

    return c.json(result, { status: 201 });
  });

  
  // Oppdaterer et prosjekt basert på ID
  app.patch('/:id', async (c) => {
    const id = c.req.param('id');
    const data = await c.req.json();
  
    console.log(`${JSON.stringify(data, null, 2)}`); 
    if (data.endDate) {
      data.endDate = new Date(data.endDate);
   }  
   if (data.startDate) {
   data.startDate = new Date(data.startDate);
   }
   if (data.updatedAt) {
    data.updatedAt = new Date(data.updatedAt);
    }

    const validation = validateProject(data);
    if (!validation.success) {
      console.log(validation.error)
      return errorResponse(c, 'BAD_REQUEST', 'Invalid project data');
    }

    const result = await projectService.update({
      ...validation.data,
      publishedAt: null,
      userId: null
    });

    if (!result.success) {
      return errorResponse(c, result.error.code as ErrorCode, result.error.message);
    }

    return c.json(result);
  });

  // Sletter et prosjekt basert på ID
  app.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await projectService.remove(id);

    if (!result.success) {
      return errorResponse(c, result.error.code as ErrorCode, result.error.message);
    }
    console.log(`${JSON.stringify(result)}`)
    return c.json(result);
  });

  return app;
};

export const projectController = createProjectController(projectService);
