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
import AddProject from './pages/AddProject';
import useProjects from './hooks/UseProjects';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

function App() {
  const { projectList, addProject, removeProject, updateProject, getProjectById } = useProjects();
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);


  const onAddProject = (newProject: ProjectProps) => addProject(newProject);

  const onRemoveProject = (id: string) => removeProject(id);

  const handleProjectClick = (project: ProjectProps) => setSelectedProject(project);

  const onUpdateProject = async (updatedProjectId: string) => {
    try {
      const updatedProject = await ofetch(`${endpoints.projects}/${updatedProjectId}`);

      updateProject(updatedProject);

      if (selectedProject?.id === updatedProjectId) {
        setSelectedProject(updatedProject);
      }

    } catch (error) {
      console.error("Error fetching updated project:", error);
    }
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
          <Route
            path="/project/:projectId"
            element={
              <ProjectDetailsPage
                getProjectById={getProjectById}
                onRemoveProject={onRemoveProject}
                onUpdateProject={onUpdateProject}
              />
            }
          />
          <Route path='/addProject' element={<AddProject  onAddProject={onAddProject}/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
