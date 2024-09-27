import {ProjectSchema, Project as ProjectPorps } from "./types";

 
export default function Project(project: ProjectPorps) {
    const {name, 
        role, 
        description,
        languages, 
        frameworks, 
        startDate, 
        githubRep, 
        pictureURL
    } = project 

    return (
        <article className="project">
            <img src={pictureURL} alt ={`Image of ${project.name}`}/>
            <a href={githubRep} target="_blank">{name}</a>
        </article>
    ); 
}
