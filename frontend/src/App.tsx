import { Project, Student } from './components/types';
//import './../App.css'
import ProjectContainer from "./components/ProjectContainer"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProjectForm from './components/ProjectForm';
import Contact from './components/Contact';
import Nav from './components/Nav';
import { useState } from 'react';
import About from './components/About';

function App() {
  const [activePage, setActivePage] = useState('home');

  const handleNavClick = (page:string) => {
    setActivePage(page);
  };

  const projects: Project[] = [
    {
      id: crypto.randomUUID(),
      name: "NotCanvas",
      roleAndResponsibilities: "Developed a website aimed at students and lecturers, allowing students to provide feedback on courses to lecturers. After the initial version of the website, I participated in analyzing security vulnerabilities in other groups' websites and implemented security measures such as input validation to prevent attacks. This included setting up a database server on a Linux server and using regular expressions for input validation.",
      description: "This project was part of the course on Data Security in Development and Operations. The website enabled students to give feedback to lecturers. The project demonstrated the importance of integrating security architecture from the beginning of development. After the first version of the website was released, security vulnerabilities were exploited, and necessary measures such as input validation were implemented to prevent attacks. I gained substantial experience in setting up a database server on a Linux server and using regular expressions for input validation.",
      githubRepository: "https://github.com/Mareamsefan/htdocs",
      languagesUsed: ["HTML", "CSS", "JavaScript", "PHP", "Regex"],
      frameworksUsed: ["No framework used"],
      startDate: new Date("2024-01-25"),
      pictureURL: "https://itstud.hiof.no/~mareamns/NotCanvas.png",
    
    },
  
    {
      id: crypto.randomUUID(),
      name: "Harbor Simulation Framework",
      roleAndResponsibilities: "Developed a framework for simulating a harbor as part of the final exam in the Frameworks and .Net course. My responsibilities included backend development using C#, adhering to coding style conventions, and conducting regular user testing to identify and implement usability improvements. Additionally, I developed a WPF GUI to test and validate the framework, ensuring its functionality and ease of use.",
      description: "This project was my final exam submission in the Frameworks and .Net course, where I developed a framework to simulate a harbor. The project aimed to familiarize myself with the principles of framework design and to follow coding style conventions throughout the development process. Regular user testing was conducted to identify potential usability improvements. The majority of the work involved backend development in C#, with additional work on a WPF GUI for quality assurance and usability evaluation. The project provided valuable insights into the balance between usability and user freedom, highlighting the challenges of maintaining usability as functionality increases.",
      githubRepository: " https://github.com/Mareamsefan/Cdull.V2024.HarborSimulation",
      languagesUsed: ["C#", "XAML"],
      frameworksUsed: [".NET Framework", "WPF"],
      startDate: new Date("2024-05-01"),
      pictureURL: "https://itstud.hiof.no/~mareamns/HarborSimulation.jfif"
    },
  
    {
      id: crypto.randomUUID(),
      name: "YourGuide MVP",
      roleAndResponsibilities: "Developed a Minimum Viable Product (MVP) for buying and selling guided tours as part of the Software Development and Testing course. My responsibilities included building a functional login system with user validation for multiple roles (admin, user, guide), integrating a database for storing user information and tour data, and developing robust APIs for efficient communication between the frontend and backend. Backend development was done using Python with Flask and SQLAlchemy for database management. I also conducted thorough testing of the application using Pytest for unit testing, Locust for load and performance testing, and Coverage to measure test coverage and ensure high code quality.",
      description: "This project was part of the final exam in the Software Development and Testing course, where I developed a Minimum Viable Product (MVP) for buying and selling guided tours. The project focused on creating a functional login system with user validation for multiple roles (admin, user, guide) and integrating a database for managing user information and tour data. Robust APIs were developed to facilitate efficient frontend-backend communication. The backend was implemented in Python using Flask and SQLAlchemy for database management, while HTML was used to create a user-friendly frontend interface. Rigorous testing was a key component, with Pytest used for unit testing, Locust for load and performance testing, and Coverage for assessing test coverage and ensuring code reliability.",
      githubRepository: "https://github.com/Mareamsefan/Group18.YourGuide.Prototype",
      languagesUsed: ["Python", "HTML"],
      frameworksUsed: ["Flask", "SQLAlchemy"],
      startDate:  new Date("2024-05-01"),
      pictureURL: "https://itstud.hiof.no/~mareamns/YourGuide-MVP.png"
  }];

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
      <ProjectContainer projects={projects}/>
      <ProjectForm/>
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
