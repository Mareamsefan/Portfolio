import Project from "./Project"
import {Project as ProjectProps} from "./types"



export default function ProjectContainer ({projects}: {projects:ProjectProps[]}) {
   
    return (
        <section id="projects-container">
            {projects.map((project, index) => (
                <Project key= {index} {...project}/>
            ))}

        </section>
    )
}
