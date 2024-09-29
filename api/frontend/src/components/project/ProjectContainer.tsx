import Project from "./Project"
import {CreateProject, Project as ProjectProps, Student} from "../types"
import CreateProjectForm from "./CreateProjectForm";
import ProjectCounter from "./ProjectCounter";

type ProjectContainerProps = {
    projectList: ProjectProps[]; 
    onAddProject: (project: any) => void; 
    onRemoveProject: (id:string) => void; 
}

export default function ProjectContainer (props: ProjectContainerProps) {
   const {projectList, onAddProject, onRemoveProject} = props;

    return (
        <>
         <ProjectCounter total={projectList.length}  /> 
            <section id="projects-container">
                {projectList.length === 0 ? (
                    <p>you have no projects yet..</p>
                ) : (
                    projectList.map((project, index) => (
                        <Project onRemoveProject={onRemoveProject} key={index} {...project} />
                    ))
                )}
            </section>
        <CreateProjectForm onAddProject={onAddProject} />
        
        </>
    )
}
