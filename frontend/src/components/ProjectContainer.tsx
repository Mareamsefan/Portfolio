import { useState } from "react"
import Project from "./Project"
import {Project as ProjectProps} from "./types"
import CreateProjectForm from "./CreateProjectForm";

type ProjectContainerProps = {
    projectList: ProjectProps[]; 
}

export default function ProjectContainer (props: ProjectContainerProps) {
   const [projectList, setProjectList] = useState<ProjectProps[]>(props.projectList ?? []); 

   const onAddProject = (project:ProjectProps) => {
    setProjectList((prev) => [...prev, {...project}])
    }; 

    return (
        <><section id="projects-container">

            {projectList.length === 0 ? (
                <p>you have no projects yet..</p>
            ) : (
                projectList.map((project, index) => (
                    <Project key={index} {...project} />
                ))
            )}
        </section><>
                <CreateProjectForm onAddProject={onAddProject} />
            </></>
    )
}
