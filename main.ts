import './assets/style.css'

import {z} from "zod"; 
import { ProjectArraySchema, ProjectSchema, type Project } from './types';
import { json } from 'stream/consumers';

const form = document.getElementById("project-form") as HTMLFormElement; 
const projectSection = document.getElementById("projects-container") as HTMLElement;  
const projects:  Project[] = []; 


// Håndterer skjema innsending
form.addEventListener("submit", async (event: SubmitEvent)=> {
    event.preventDefault(); 

    const newProject = {
        id: crypto.randomUUID(),  
        projectName: ( (event.target as HTMLFormElement).elements.namedItem("projectName") as HTMLInputElement)?.value, 
        roleAndResponsibilities: ((event.target as HTMLFormElement).elements.namedItem("roleAndResponsibilites") as HTMLTextAreaElement)?.value, 
        projectDescription: ((event.target as HTMLFormElement).elements.namedItem("projectDescription") as HTMLTextAreaElement)?.value, 
        languagesUsed:  ((event.target as HTMLFormElement).elements.namedItem("languagesUsed") as HTMLTextAreaElement)?.value.split(',').map(lang => lang.trim()),
        frameworksUsed:  ((event.target as HTMLFormElement).elements.namedItem("frameworksUsed") as HTMLTextAreaElement)?.value.split(',').map(lang => lang.trim()),
        startDate: new Date(((event.target as HTMLFormElement).elements.namedItem("startDate") as HTMLInputElement)?.value),
        githubRepository:  ((event.target as HTMLFormElement).elements.namedItem("githubRepository") as HTMLInputElement)?.value,
        pictureURL: ((event.target as HTMLFormElement).elements.namedItem("projectPictureURL") as HTMLInputElement)?.value,
    }; 


    projects.push(newProject); 
    updateProjectSection(); 

try {
    const response = await fetch ("/api/add", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(newProject),
    }); 

    if (response.status === 201) {
        loadFromJSON(); 
        console.log("Project saved on server"); 
       
    } else {
        console.error("Erorr while saving the project on server"); 
    }
    } catch (error) {
            console.error("Erorr while sending data to server:", error); 
    }
}); 

function updateProjectSection() {
    console.log(projects);
    if (!projectSection) return; 
    projectSection.innerHTML = ""; 

    for (const project of projects) {
        const article = document.createElement("article"); 
        article.classList.add("project"); 

        const img = document.createElement("img"); 
        img.src = project.pictureURL; 
        img.alt = `Image of ${project.projectName}`; 

        const link = document.createElement("a"); 
        link.href = project.githubRepository; 
        link.textContent = project.projectName; 

        article.appendChild(img); 
        article.appendChild(link); 
        projectSection.appendChild(article); 
    }
}

function loadFromJSON() {
    const jsonId = document.getElementById("json"); 
    if (jsonId) jsonId.innerHTML = ""; 


    fetch("assets/projects.json")
        .then((response) => {
            return response.json();
        })

        .then((data) => {
            console.log(data);
            
            for (const project of data) {
                const element = document.createElement("p");
                element.textContent = `${project.projectName}`; 
                jsonId?.appendChild(element); 
            }
        }); 

}

function loadFromApi() {

    fetch("/api/projects")
    .then((response) => response.json())
    .then((data: unknown) => {
        try {
            const validatedProjects = ProjectArraySchema.parse(data); 

            projects.push(...validatedProjects); 
            updateProjectSection(); 
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error("Ugyldig data mottatt fra serveren:", error.errors); 
            } else{
                console.error("Uventet feil ved validering av data:", error);
            }
        }
    })
    .catch((error: Error) => {
        console.error("Feil ved henting av data fra servern:", error); 
    });
}

loadFromJSON();