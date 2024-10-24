import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';
import fs from "node:fs/promises";
import {ProjectSchema, type Project } from "../../frontend/src/components/types";
import { error } from 'node:console';
import { getProjectsController } from './features/projects/controller';

const app = new Hono()

app.use("/*", cors()); 


//TODO: MÅ ENDRE ALLE STEDER DER GET ER BARE /PROJECT TIL "/V1/PROJECTS"

//FIXME: --> slik henter du routes fra controller -> app.route("/v1/students", studentController);
app.get('/v1/projects', getProjectsController)

//TODO: MÅ ENDRE ALLE STEDER DER POST ER BARE /ADD TIL "/V1/PROJECTS"
/*
app.post('/v1/projects', async(c) => {
    try {
        const newProject = await c.req.json(); 

        const project = ProjectSchema.parse({ id: crypto.randomUUID(), ...newProject });
        
        projects.push(project); 

        return c.json({ message: "New project added successfully" }, { status: 200 });
    } catch(error) {
        console.error("Failed to add project", error); 
        return c.json({ error: "Failed to add project" }, { status: 500 });
    }
});

//TODO: MÅ ENDRE ALLE STEDER DER POST ER BARE /project TIL "/V1/PROJECTS/:id"

app.delete('/project', async (c) => {
  try {
      const projectToRemove = await c.req.json(); // Mottar hele prosjektet

      // Hvis prosjektet mangler
      if (!projectToRemove || !projectToRemove.id) {
          return c.json({ error: "Invalid project data" }, 400);
      }

      // Finn prosjektet som skal fjernes
      const projectIndex = projects.findIndex(
        (project) => project.id.toLowerCase() === projectToRemove.id.toLowerCase()
      );

      // Hvis prosjektet ikke finnes
      if (projectIndex === -1) {
          return c.json({ error: "Project not found" }, 404);
      }

      // Fjern prosjektet fra listen
      projects.splice(projectIndex, 1);

      return c.json({ message: "Project removed successfully" }, 200);
  } catch (error) {
      console.error("Failed to remove project", error);
      return c.json({ error: "Failed to remove project" }, 500);
  }
});

*/

export default app; 