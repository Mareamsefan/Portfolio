import Project from "./Project"
import {CreateProject, Project as ProjectProps, Student} from "./types"
import CreateProjectForm from "./CreateProjectForm";

type ProjectContainerProps = {
    projectList: ProjectProps[]; 
    onAddProject: (project: any) => void; 
    //onRemoveProject?: (id:string) => void; 
}

export default function ProjectContainer (props: ProjectContainerProps) {
   const {projectList, onAddProject} = props;

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