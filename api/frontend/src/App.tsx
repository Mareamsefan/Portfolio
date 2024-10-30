// src/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Home, { user } from './pages/Home';
import { Project as ProjectProps } from './components/project/types';
import { ofetch } from 'ofetch';
import { endpoints } from './config/urls';
import About from './pages/About';
import Contact from './pages/Contact';
import Project from './pages/Project';
import AddProject from './pages/AddProject';

function App() {
  const [projectList, setProjectList] = useState<ProjectProps[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);

  //TODO: lage en customhook for loadprojects: 
  useEffect(() => {
      const loadProjects = async () => {
        try {
          const response = await ofetch(endpoints.projects);
          setProjectList(response.data);
        } catch (error) {
          console.error("Error loading projects:", error);
        }
      };
      loadProjects();
  },[]);

  const onAddProject = (newProject: ProjectProps) => {
  
    setProjectList((prev) => [...prev, newProject]);
  };

  const onRemoveProject = (id: string) => {
    setProjectList((prev) => prev.filter((project) => project.id !== id));
  };

  const handleProjectClick = (project: ProjectProps) => setSelectedProject(project);

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
  
    // ProjectDetails component to handle showing a specific project
    const ProjectDetailsPage = () => {
      const { projectId } = useParams<{ projectId: string }>();
      const project = projectList.find(p => p.id === projectId) || null; // Find the project by ID 
      
  
      return project ? (
        <Project
          {...project}
          onRemoveProject={onRemoveProject}
          onUpdateProject={onUpdateProject}
        />
      ) : (
        <p>Project not found.</p>
      );
    };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                projectList={projectList}
                onAddProject={onAddProject}
                onRemoveProject={onRemoveProject}
                onProjectClick={handleProjectClick}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact user={user} />} />
          <Route path="/project/:projectId" element={<ProjectDetailsPage />} /> {/* New route for project details */}
          <Route path='/addProject' element={<AddProject  onAddProject={onAddProject}/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
