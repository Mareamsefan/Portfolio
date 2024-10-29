import { CreateProject, Project, validateProject,} from './components/project/types';
import ProjectContainer from "./components/project/ProjectContainer"
import Header from "./components/main/Header"
import Footer from "./components/main/Footer"
import Contact from './components/Contact';
import Nav from './components/main/Nav';
import { useEffect, useState } from 'react';
import About from './components/About';
import { ofetch } from 'ofetch';
import { User } from './components/student/types';

function App() {
  const [activePage, setActivePage] = useState('home');

  const handleNavClick = (page:string) => {
    setActivePage(page);
  };
  const [projectList, setProjectList] = useState<Project[]>([]); 

  const onAddProject = async (project: CreateProject) => {
    try {
      const response = await ofetch("http://localhost:3000/v1/projects", {
        method: 'POST',
        body: project,
      });
  
      if (response.success) {
        // Anta at serveren returnerer det opprettede prosjektet med ID
        setProjectList((prev) => [...prev, response.data]);
      } else {
        console.error("Failed to create project:", response.error);
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  

  const onRemoveProject = (id:string) => {
    setProjectList((prev) => prev.filter((student)=> student.id !== id)); 
  }

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await ofetch("http://localhost:3000/v1/projects"); 
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
      <ProjectContainer projectList={projectList} onAddProject={onAddProject}  onRemoveProject={onRemoveProject}/>
      </>
    )}
    {activePage === 'about' && <About />}
    {activePage === 'contact' && <Contact student={student} /> }
    
   
    </main>
   <Footer />
   
   </>
  )
}

export default App
