import {ProjectSchema, type Project } from "../../../backend/src/types";

 const Project = (project: Project) => {
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
export default Project; 