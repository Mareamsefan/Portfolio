import { useState } from "react";
import { CreateProject, Project, ProjectCreateSchema } from "./types";
import { randomUUID } from "crypto";
import { string } from "zod";

type AddProjectFormProps = {
  onAddProject: (project:any) => void; 
}

export default function CreateProjectForm(props: AddProjectFormProps){
  const {onAddProject} = props; 

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState('');
  const [frameworks, setFrameworks] = useState('');
  const [startDate, setStartDate] = useState('');
  const [githubRep, setGithubRep] = useState<string>('');
  const [pictureURL, setPictureURL] = useState('');
  

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
  

    const newProject: CreateProject = {
        name, 
        role, 
        description, 
        languages: [], 
        frameworks: [], 
        startDate: new Date, 
        githubRep, 
        pictureURL
    }

    try {
      const response = await fetch("http://localhost:3000/add", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      }); 
    
    if (response.ok){
      const result = await response.json(); 
      console.log("New project added sucessfully", newProject); 
      onAddProject(newProject)

      //reseter staten
        setName(''); 
        setRole(''); 
        setDescription(''); 
        setLanguages(''); 
        setFrameworks(''); 
        setGithubRep(''); 
        setPictureURL(''); 
      } else {
        console.error("error:", response.status)
      }
    }catch (error) {
      console.error("Error submitting the project:", error);
    }
  }
  
    return (
      <section id="form-section">
        <h3>Register a project</h3>
        <form id="projectForm" onSubmit={handelSubmit} method="post">
          <label htmlFor="name">Project Name:</label>
          <input
            type="text"
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the project name..."
          />

          <label htmlFor="roleAndResponsibilities">Role and responsibilities:</label>
          <textarea
            id="roleAndResponsibilities"
            className="input"
            name="roleAndResponsibilities"
            rows={4}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Describe your role and responsibilities..."
          />

          <label htmlFor="description">Project description:</label>
          <textarea
            id="description"
            className="input"
            name="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your project description here..."
          />

          <label htmlFor="languagesUsed">Languages used:</label>
          <textarea
            id="languagesUsed"
            className="input"
            name="languagesUsed"
            rows={2}
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="List the languages used in the project..."
          />

          <label htmlFor="frameworksUsed">Frameworks used:</label>
          <textarea
            id="frameworksUsed"
            className="input"
            name="frameworksUsed"
            rows={2}
            value={frameworks}
            onChange={(e) => setFrameworks(e.target.value)}
            placeholder="List the frameworks used in the project..."

          />

          <label htmlFor="startDate">Start date:</label>
          <input
            type="date"
            id="startDate"
            className="input"
            value={startDate.toString()}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Select the start date..."
          />

          <label htmlFor="githubRepository">Github repository:</label>
          <input
            type="text"
            id="githubRepository"
            className="input"
            value={githubRep}
            onChange={(e) => setGithubRep(e.target.value)}
            placeholder="Enter the GitHub repository URL..."
          />

          <label htmlFor="projectPictureURL">Project picture:</label>
          <input
            type="text"
            id="projectPictureURL"
            className="input"
            value={pictureURL}
            onChange={(e) => setPictureURL(e.target.value)}
            placeholder="Enter the picture URL..."
          />
          <button type="submit">Register</button>
        </form>
    </section>
    
    ); 
};

