
import { Project, CreateProject, UpdateProject, validateProject } from '@/features/projects/types';
import { z } from 'zod';
import { Hono } from 'hono';
import { errorResponse, type ErrorCode } from "@/lib/error";
import { ProjectService, projectService } from '../service/indext';

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
   // const user = c.get('user'); // Antar brukerdata blir satt i `c.get()`
    const data = await c.req.json();

    const validation = validateProject(data);
    if (!validation.success) {
      return errorResponse(c, 'BAD_REQUEST', 'Invalid project data');
    }

    const result = await projectService.create({
      ...validation.data,
      // Legger til autentisert bruker-ID
    });

    if (!result.success) {
      return errorResponse(c, result.error.code as ErrorCode, result.error.message);
    }

    return c.json(result, { status: 201 });
  });

  
  // Oppdaterer et prosjekt basert på ID
  app.patch('/:id', async (c) => {
    const id = c.req.param('id');
    const data = await c.req.json();

    const validation = validateProject(data);
    if (!validation.success) {
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

    return c.json(result);
  });

  return app;
};

export const projectController = createProjectController(projectService);
