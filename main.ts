import './statics/style.css';
import { z } from 'zod';
import { ProjectArraySchema, type Project } from './types';
import { Console } from 'console';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('projectForm') as HTMLFormElement;
  const projectList = document.getElementById('projectsList') as HTMLUListElement;
  const projects: Project[] = [];

  if (!form) {
    console.error("Element with ID 'projectForm' not found");
    return;
  }

  // Håndterer skjema innsending
  form.addEventListener('submit', async (event: SubmitEvent) => {
    event.preventDefault();

    const newProject = {
        id: crypto.randomUUID(),  
        name: ( (event.target as HTMLFormElement).elements.namedItem("projectName") as HTMLInputElement)?.value, 
        roleAndResponsibilities: ((event.target as HTMLFormElement).elements.namedItem("roleAndResponsibilites") as HTMLTextAreaElement)?.value, 
        description: ((event.target as HTMLFormElement).elements.namedItem("projectDescription") as HTMLTextAreaElement)?.value, 
        languagesUsed:  ((event.target as HTMLFormElement).elements.namedItem("languagesUsed") as HTMLTextAreaElement)?.value.split(',').map(lang => lang.trim()),
        frameworksUsed:  ((event.target as HTMLFormElement).elements.namedItem("frameworksUsed") as HTMLTextAreaElement)?.value.split(',').map(lang => lang.trim()),
        startDate: new Date(((event.target as HTMLFormElement).elements.namedItem("startDate") as HTMLInputElement)?.value),
        githubRepository:  ((event.target as HTMLFormElement).elements.namedItem("githubRepository") as HTMLInputElement)?.value,
        pictureURL: ((event.target as HTMLFormElement).elements.namedItem("projectPictureURL") as HTMLInputElement)?.value,
    }; 


    projects.push(newProject);
    updateProjectList();

    try {
      const response = await fetch('http://localhost:3999/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (response.status === 201) {
        console.log('Project saved on server');
      } else {
        console.error('Error while saving the project on server');
      }
    } catch (error) {
      console.error('Error while sending data to server:', error);
    }
  });

  function updateProjectList() {
    if (!projectList) return;
    projectList.innerHTML = '';

    for (const project of projects) {
      const listItem = document.createElement('li');
      listItem.textContent = `${project.name} - ${new Date(project.startDate).toLocaleDateString()}`;
      projectList.appendChild(listItem);
    }
  }

  function loadFromApi() {
    fetch('http://localhost:3999')
      .then((response) => response.json())
      .then((data: unknown) => {
        try {
          const validatedProjects = ProjectArraySchema.parse(data);
          projects.push(...validatedProjects);
          updateProjectList();
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error('Ugyldig data mottatt fra serveren:', error.errors);
          } else {
            console.error('Uventet feil ved validering av data:', error);
          }
        }
      })
      .catch((error: Error) => {
        console.error('Feil ved henting av data fra servern:', error);
      });
  }

  function loadFromJSON() {
    fetch("statics/projects.json")
    .then((response) => response.json())
    .then((data) => {
        const projectsContainer = document.getElementById("projects-container");
        if (!projectsContainer) return;

        console.log("Du får data ut!!!");

        for (const project of data) {
            const article = document.createElement('article');
            article.classList.add('project');

            const img = document.createElement('img');
            img.src = project.pictureURL;
            img.alt = `Image of ${project.name}`;
            img.style.maxWidth = "100%";
            article.appendChild(img);

            const link = document.createElement('a');
            link.href = project.githubRepository;
            link.textContent = project.name;
            link.target = "_blank";
            article.appendChild(link);

            // Legger til `article`-elementet i `projects-container`
            projectsContainer.appendChild(article);
        }
    })
    .catch((error) => {
        console.error("Error fetching or processing data:", error);
    });
  }

  loadFromJSON();
  loadFromApi();
});
