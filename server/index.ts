import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import fs, { readFile } from "node:fs/promises";
import { ProjectSchema, type Project } from "../types";
import { z } from "zod";


const app = new Hono();

app.use("/*", cors());

app.use("/assets/*", serveStatic({ root: "./" }));

app.use("/statics/*", serveStatic({ root: "./" }));

const projects: Project[] = 
[
    {
      id: crypto.randomUUID(),
      projectName: "Personal Portfolio Website",
      roleAndResponsibilities: "Frontend Developer - Responsible for designing and implementing the user interface.",
      projectDescription: "A personal portfolio website showcasing my work, skills, and contact information.",
      githubRepository: "https://github.com/username/portfolio-website",
      languagesUsed: ["HTML", "CSS", "JavaScript"],
      frameworksUsed: ["React", "Bootstrap"],
      startDate: new Date("2023-05-01"),
      pictureURL: "https://example.com/path-to-image.jpg"
    },

];

app.get("/json", async (c) => {
    
    const data = await fs.readFile("./assets/projects.json", "utf-8");
    const dataAsJson = JSON.parse(data);
    return c.json(dataAsJson);

});


app.post("/api/add", async (c) => {

    const newProject = await c.req.json(); 

    const project = ProjectSchema.parse(newProject);

    if(!project) return c.json({ error: "Invalid project"}, { status: 400 }); 
    console.log(project); 
    projects.push(project); 

    const jsonData = await readFile("./assets/projects.json", "utf-8");

    const data = JSON.parse(jsonData); 

    await fs.writeFile(
        "./assets/projects.json",
        JSON.stringify([...data, project], null, 2)

    ); 

    return c.json<Project[]>(projects, {status: 201}); 
});

const htmlForm = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="#" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>My Journey</title>
  </head>
  <body>
    <header
    id="main-header"
    >
      <nav>
        <a href="index.html">Home</a>
        <a href="#">About me</a>
        <a href="#">Contact</a>
        <a href="addProject.html">Add a Project +</a>
      </nav>
      <section id="bio-container">
        <img src="https://dummyimage.com/100x100/ffffff/000000.jpg" alt="profile-picture">
        <h1>Maream Sefan</h1>
        <p>bio...</p>
      </section>
    </header>
    <main>
      <section id="projects-container">

      </section>
      <pre id="json"></pre>
    </main>
    <footer>
      <p>Copyright Maream Sefan - My Journey</p>
      <a href="https://www.linkedin.com/in/maream-s-a25874255" target="_blank">LinkedIn</a>
      <a href="https://github.com/Mareamsefan" target="_blank">GitHub</a>
    </footer>
    <script type="module" src="main.ts" defer></script>
  </body>
</html>
`;

app.get("/html", (c) => {
    return c.html(htmlForm); 
}); 


app.get("/api/projects", (c) => {
    return c.json<Project[]>(projects); 
}); 

const port = 3999;


console.log(`Server is running on port ${port}`);
/*
serve({
  fetch: app.fetch,
  port,
});*/

export default app; 