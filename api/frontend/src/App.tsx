import { createProject, CreateProject, Project as ProjectProps, validateProject,} from './components/project/types';
import ProjectContainer from "./components/project/ProjectContainer"
import Header from "./components/main/Header"
import Footer from "./components/main/Footer"
import Contact from './components/Contact';
import Nav from './components/main/Nav';
import { useEffect, useState } from 'react';
import About from './components/About';
import { ofetch } from 'ofetch';
import { User } from './components/student/types';
import Project  from './components/project/Project';
import { endpoints } from './config/urls';


function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
  const handleNavClick = (page:string) => {
    setActivePage(page);
    if (page !== 'project'){
      setSelectedProject(null);
    }
  };

  const handleProjectClick = (project: ProjectProps) => {
    setSelectedProject(project); 
    setActivePage('project'); 
  }
  const [projectList, setProjectList] = useState<ProjectProps[]>([]); 

  const onAddProject = (project: CreateProject) => {
    //setProjectList((prev)=> [...prev, createProject]); 
  }; 
  

  const onRemoveProject = (id:string) => {
    setProjectList((prev) => prev.filter((student)=> student.id !== id)); 
  }

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await ofetch(endpoints.projects); 
        console.log(response)
         
        console.log(response);
        
        validateProject(response.data); 
        setProjectList(response.data); 


      }catch(error){
        console.error("Error loading projects:", error); 
      }

    }
     loadProjects();
  }, 
  []);

  // Funksjon for å oppdatere et spesifikt prosjekt
  const onUpdateProject = async (updatedProjectId: string) => {
    try {
      const updatedProject = await ofetch(`${endpoints.projects}/${updatedProjectId}`);
      
      setProjectList((prev) =>
        prev.map((p) => (p.id === updatedProjectId ? updatedProject : p))
      );
      
      if (selectedProject?.id === updatedProjectId) {
        setSelectedProject(updatedProject);
      }
    } catch (error) {
      console.error("Error fetching updated project:", error);
    }
  };
  
 


  const student: User = {
    id: crypto.randomUUID(),
    name: "Maream Sefan",
    degree: "Bachelor in informatics",
    points: 120,
    email: "mareamns@hiof.no",
    pictureURL: "https://itstud.hiof.no/~mareamns/pf-removebg-preview.png", 
    experiences: ["Figma UI for customer X", " Website for customer Y" ]
   
  }; 

  return (
   <>
   <Nav onNavClick={handleNavClick}/>
   <main>
    {activePage === 'home' && (
      <>
      <Header student={student}/>
      <ProjectContainer projectList={projectList} onAddProject={onAddProject} 
       onRemoveProject={onRemoveProject} onProjectClick={handleProjectClick} />
      </>
    )}
    {activePage === 'about' && <About />}
    {activePage === 'contact' && <Contact student={student} /> }
    {activePage === 'project' && selectedProject && (
          <Project
            {...selectedProject}
            onRemoveProject={onRemoveProject}
            onUpdateProject={onUpdateProject}
          />
        )}
   
    </main>
   <Footer />
   
   </>
  )
}

export default App
