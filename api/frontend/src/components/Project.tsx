import { useState } from "react";
import {ProjectSchema, Project as ProjectPorps } from "./types";
import { ofetch } from "ofetch";

 
export default function Project(project: ProjectPorps
    & {onRemoveProject: (id:string) => void; }
) {
    const {
        id,
        name, 
        role, 
        description,
        languages, 
        frameworks, 
        startDate, 
        githubRep, 
        pictureURL, 
        onRemoveProject
    } = project 

    const [hovered, sethovered] = useState<boolean>(false);

    const updateShowState = () => {
        sethovered(true)
    }
    const setShowRemove = () => {
        sethovered(false)
    }
    const handleRemoveProject = async () => {
        try {
            const response = await fetch(`http://localhost:3000/project`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(project), 
            });
            onRemoveProject(project.id);
            
        } catch (error) {
            console.error("Error deleting the project:", error);
        }
    };
    
    return (
        <article className="project" onMouseOver={updateShowState} onMouseLeave={setShowRemove}>
            <img src={pictureURL} alt ={`Image of ${project.name}`}/>
            <a href={githubRep} target="_blank">{name}</a>
            {hovered && (
            <button type="submit" onClick={handleRemoveProject}>Remove project</button>
            )}
        </article>
    ); 
}
