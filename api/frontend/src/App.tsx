import { CreateProject, Project, ProjectArraySchema, Student } from './components/types';
import ProjectContainer from "./components/ProjectContainer"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Contact from './components/Contact';
import Nav from './components/Nav';
import { useEffect, useState } from 'react';
import About from './components/About';
import { ofetch } from 'ofetch';

function App() {
  const [activePage, setActivePage] = useState('home');

  const handleNavClick = (page:string) => {
    setActivePage(page);
  };
  const [projectList, setProjectList] = useState<Project[]>([]); 
  
  const onAddProject = (project: CreateProject) => {
    setProjectList((prev)=> [...prev, {id:crypto.randomUUID(), ...project}]); 
  }; 

  const onRemoveProject = (id:string) => {
    setProjectList((prev) => prev.filter((student)=> student.id !== id)); 
  }
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await ofetch("http://localhost:3000/projects"); 
        console.log(response)
         
        console.log(response);
        
        ProjectArraySchema.safeParse(response); 
        setProjectList(response); 


      }catch(error){
        console.error("Error loading projects:", error); 
      }

    }
     loadProjects();
  }, 
  []);

 
  
 
  
  
  const studentWithNoExperience: Student = {
    name: "Maream Sefan",
    degree: "Bachelor in informatics",
    points: 120,
    email: "mareamns@hiof.no",
    pictureURL: "https://itstud.hiof.no/~mareamns/pf-removebg-preview.png", 
    experiences: [
	  ],
   
  };

  const student: Student = {
    name: "Maream Sefan",
    degree: "Bachelor in informatics",
    points: 120,
    email: "mareamns@hiof.no",
    pictureURL: "https://itstud.hiof.no/~mareamns/pf-removebg-preview.png", 
    experiences: [
      { name: "Figma UI for customer X" },
		  { name: "Website for customer Y" }
  
	  ],
   
  }; 

  return (
   <>
   <Nav onNavClick={handleNavClick}/>
   <main>
    {activePage === 'home' && (
      <>
      <Header student={student}/>
      <ProjectContainer projectList={projectList} onAddProject={onAddProject} />
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
