import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "node:fs/promises";
import { ProjectSchema, type Project } from "./types";
import { z } from "zod";

const app = new Hono();

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

const projects: Project[] = [
  {
    id: crypto.randomUUID(),
    name: "Personal Portfolio Website",
    roleAndResponsibilities: "Frontend Developer - Responsible for designing and implementing the user interface.",
    description: "A personal portfolio website showcasing my work, skills, and contact information.",
    githubRepository: "https://github.com/username/portfolio-website",
    languagesUsed: ["HTML", "CSS", "JavaScript"],
    frameworksUsed: ["React", "Bootstrap"],
    startDate: new Date("2023-05-01"),
    pictureURL: "https://example.com/path-to-image.jpg",
  },
];

app.get("/json", async (c) => {
  const data = await fs.readFile("./statics/projects.json", "utf-8");
  const dataAsJson = JSON.parse(data);
  return c.json(dataAsJson);
});

app.post("/add", async (c) => {
  const newProject = await c.req.json();
  const project = ProjectSchema.parse(newProject);

  if (!project) return c.json({ error: "Invalid project" }, { status: 400 });

  console.log(project); 
  projects.push(project);

  return c.json<Project[]>(projects, { status: 201 });
});

app.get("/", (c) => {
  return c.json<Project[]>(projects); 

});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
