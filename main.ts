import './statics/style.css';
import { z } from 'zod';
import { ProjectArraySchema, type Project } from './types';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('projectForm') as HTMLFormElement;
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
        name: ( (event.target as HTMLFormElement).elements.namedItem("name") as HTMLInputElement)?.value, 
        roleAndResponsibilities: ((event.target as HTMLFormElement).elements.namedItem("roleAndResponsibilites") as HTMLTextAreaElement)?.value, 
        description: ((event.target as HTMLFormElement).elements.namedItem("description") as HTMLTextAreaElement)?.value, 
        languagesUsed:  ((event.target as HTMLFormElement).elements.namedItem("languagesUsed") as HTMLTextAreaElement)?.value.split(',').map(lang => lang.trim()),
        frameworksUsed:  ((event.target as HTMLFormElement).elements.namedItem("frameworksUsed") as HTMLTextAreaElement)?.value.split(',').map(lang => lang.trim()),
        startDate: new Date(((event.target as HTMLFormElement).elements.namedItem("startDate") as HTMLInputElement)?.value),
        githubRepository:  ((event.target as HTMLFormElement).elements.namedItem("githubRepository") as HTMLInputElement)?.value,
        pictureURL: ((event.target as HTMLFormElement).elements.namedItem("projectPictureURL") as HTMLInputElement)?.value,
    }; 

    console.log(newProject)
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
        alert('Project was successfully saved on the server');
        console.log('Project saved on server');
      } else {
        alert('Error occurred while saving the project on the server');
        console.error('Error while saving the project on server');
      }
    } catch (error) {
      alert('An error occurred while sending data to the server');
      console.error('Error while sending data to server:', error);
    }
    
  })
  
  function updateProjectList() {
    const projectsContainer = document.getElementById("projects-container");
    if (!projectsContainer) return;
   //tømmer container for å unngå duplikater av "gamle" prosjekter
    projectsContainer.innerHTML = ``
    for (const project of projects) {
      const article = document.createElement('article');
      article.classList.add('project');

      const img = document.createElement('img');
      img.src = project.pictureURL;
      img.alt = `Image of ${project.name}`;
      article.appendChild(img);

      const link = document.createElement('a');
      link.href = project.githubRepository;
      link.textContent = project.name;
      link.target = "_blank";
      article.appendChild(link);

      // Legger til article-elementet i projects-container
      projectsContainer.appendChild(article);
    }
  }

  function loadFromApi() {
    fetch('http://localhost:3999/')
      .then((response) => response.json())
      .then((data: Project) => {
        try {
          const validatedProjects = ProjectArraySchema.parse(data);
          projects.push(...validatedProjects);
          updateProjectList();
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error('Invalid data received from server:', error.errors);
          } else {
            console.error('Unexpected error while validating data:', error);
          }
        }
      })
      .catch((error: Error) => {
        console.error('Error while fetching data from server:', error);
      });
  }


  
  function loadFromJSON() {
    fetch("statics/projects.json")
    .then((response) => response.json())
    .then((data) => {
        const projectsContainer = document.getElementById("projects-container");
        if (!projectsContainer) return;

        for (const project of data) {
            const article = document.createElement('article');
            article.classList.add('project');

            const img = document.createElement('img');
            img.src = project.pictureURL;
            img.alt = `Image of ${project.name}`;
            article.appendChild(img);

            const link = document.createElement('a');
            link.href = project.githubRepository;
            link.textContent = project.name;
            //sik at den ikke åpner ny fane/vindu
            link.target = "_blank";
            article.appendChild(link);

            // Legger til article -elementet i projects-container
            projectsContainer.appendChild(article);
        }
    })
    .catch((error) => {
        console.error("Error fetching or processing data:", error);
    });
  
  }
  //loadFromJSON();
  loadFromApi();

 
});
