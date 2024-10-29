import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';
import fs from "node:fs/promises";
import {ProjectSchema, type Project } from "../../frontend/src/components/types";
import { error } from 'node:console';
import { projectController } from './features/projects/controller';

const app = new Hono()

app.use("/*", cors()); 


app.route("/v1/projects", projectController);


export default app; 