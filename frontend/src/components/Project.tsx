import {ProjectSchema, Project as ProjectPorps } from "./types";

 
export default function Project(project: ProjectPorps) {
    const {name, 
        roleAndResponsibilities, 
        description,languagesUsed, 
        frameworksUsed, 
        startDate, 
        githubRepository, 
        pictureURL
    } = project 

    return (
        <article className="project">
            <img src={pictureURL} alt ={`Image of ${project.name}`}/>
            <a href={githubRepository} target="_blank">{name}</a>
        </article>
    ); 
}
