import {CreateProject, Project as ProjectProps} from "../project/types"
import CreateProjectForm from "./CreateProjectForm";
import ProjectCounter from "./ProjectCounter";
import ProjectCard from "./ProjectCard";

type ProjectContainerProps = {
    projectList: ProjectProps[]; 
    onAddProject: (project: any) => void; 
    onRemoveProject: (id:string) => void; 
    onProjectClick: (project: ProjectProps) => void;
}

export default function ProjectContainer (props: ProjectContainerProps) {
   const {projectList, onAddProject, onRemoveProject, onProjectClick} = props;

    return (
        <>
         <ProjectCounter total={projectList.length}  /> 
            <section id="projects-container">
                {projectList.length === 0 ? (
                    <p>you have no projects yet..</p>
                ) : (
                    projectList.map((project) => (
                        <ProjectCard 
                        key={project.id}
                        project={project}
                        onRemoveProject={onRemoveProject} 
                        onProjectClick={onProjectClick} />
                    ))
                )}
            </section>
        <CreateProjectForm onAddProject={onAddProject} />
        
        </>
    )
}
