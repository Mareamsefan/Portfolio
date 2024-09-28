import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';
import fs from "node:fs/promises";
import {ProjectSchema, type Project } from "../../frontend/src/components/types";
import { error } from 'node:console';

const app = new Hono()

app.use("/*", cors()); 

const projects: Project[] = [
  {
    id: crypto.randomUUID(),
    name: "NotCanvas",
    role: "Developed a website aimed at students and lecturers, allowing students to provide feedback on courses to lecturers. After the initial version of the website, I participated in analyzing security vulnerabilities in other groups' websites and implemented security measures such as input validation to prevent attacks. This included setting up a database server on a Linux server and using regular expressions for input validation.",
    description: "This project was part of the course on Data Security in Development and Operations. The website enabled students to give feedback to lecturers. The project demonstrated the importance of integrating security architecture from the beginning of development. After the first version of the website was released, security vulnerabilities were exploited, and necessary measures such as input validation were implemented to prevent attacks. I gained substantial experience in setting up a database server on a Linux server and using regular expressions for input validation.",
    githubRep: "https://github.com/Mareamsefan/htdocs",
    languages: ["HTML", "CSS", "JavaScript", "PHP", "Regex"],
    frameworks: ["No framework used"],
    startDate: new Date("2024-01-25"),
    pictureURL: "https://itstud.hiof.no/~mareamns/NotCanvas.png",
  
  },

  {
    id: crypto.randomUUID(),
    name: "Harbor Simulation Framework",
    role: "Developed a framework for simulating a harbor as part of the final exam in the Frameworks and .Net course. My responsibilities included backend development using C#, adhering to coding style conventions, and conducting regular user testing to identify and implement usability improvements. Additionally, I developed a WPF GUI to test and validate the framework, ensuring its functionality and ease of use.",
    description: "This project was my final exam submission in the Frameworks and .Net course, where I developed a framework to simulate a harbor. The project aimed to familiarize myself with the principles of framework design and to follow coding style conventions throughout the development process. Regular user testing was conducted to identify potential usability improvements. The majority of the work involved backend development in C#, with additional work on a WPF GUI for quality assurance and usability evaluation. The project provided valuable insights into the balance between usability and user freedom, highlighting the challenges of maintaining usability as functionality increases.",
    githubRep: " https://github.com/Mareamsefan/Cdull.V2024.HarborSimulation",
    languages: ["C#", "XAML"],
    frameworks: [".NET Framework", "WPF"],
    startDate: new Date("2024-05-01"),
    pictureURL: "https://itstud.hiof.no/~mareamns/HarborSimulation.jfif"
  },

  {
    id: crypto.randomUUID(),
    name: "YourGuide MVP",
    role: "Developed a Minimum Viable Product (MVP) for buying and selling guided tours as part of the Software Development and Testing course. My responsibilities included building a functional login system with user validation for multiple roles (admin, user, guide), integrating a database for storing user information and tour data, and developing robust APIs for efficient communication between the frontend and backend. Backend development was done using Python with Flask and SQLAlchemy for database management. I also conducted thorough testing of the application using Pytest for unit testing, Locust for load and performance testing, and Coverage to measure test coverage and ensure high code quality.",
    description: "This project was part of the final exam in the Software Development and Testing course, where I developed a Minimum Viable Product (MVP) for buying and selling guided tours. The project focused on creating a functional login system with user validation for multiple roles (admin, user, guide) and integrating a database for managing user information and tour data. Robust APIs were developed to facilitate efficient frontend-backend communication. The backend was implemented in Python using Flask and SQLAlchemy for database management, while HTML was used to create a user-friendly frontend interface. Rigorous testing was a key component, with Pytest used for unit testing, Locust for load and performance testing, and Coverage for assessing test coverage and ensuring code reliability.",
    githubRep: "https://github.com/Mareamsefan/Group18.YourGuide.Prototype",
    languages: ["Python", "HTML"],
    frameworks: ["Flask", "SQLAlchemy"],
    startDate:  new Date("2024-05-01"),
    pictureURL: "https://itstud.hiof.no/~mareamns/YourGuide-MVP.png"
}
];


app.get('/projects', async(c) => {
  return c.json(projects)
})

app.post('/add', async(c) => {
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



export default app; 