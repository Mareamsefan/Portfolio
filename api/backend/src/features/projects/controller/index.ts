import { Context } from 'hono';
import type { Result } from '../types/index';
import { getProjects } from '../service/indext'

// Controller for fetching projects in Hono
export const getProjectsController = async (c: Context) => {
  try {
    const projects = await getProjects();

    // Wrap the response in the Result<T> type
    const result: Result<typeof projects> = {
      success: true,
      data: projects,
    };

    return c.json(result); // Return the successful response
  } catch (error) {
    // Wrap the error in the Result type
    const result: Result<null> = {
      success: false,
      error: {
        code: 'FETCH_ERROR',
        message: 'Failed to fetch projects',
      },
    };

    return c.json(result, 500); // Return the error response with status 500
  }
};
