import Project from "./Project"



const ProjectContainer = ({projects}: {projects:Project[]}) => {

    return (
        <section id="projects-container">
            {projects.map((project, index) => (
                <Project key= {index} {...project}/>
            ))}

        </section>
    )
}

export default ProjectContainer