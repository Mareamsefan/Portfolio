import { useState } from "react";
import { CreateProject } from "./types";
import { ofetch } from "ofetch";

type AddProjectFormProps = {
  onAddProject: (project: CreateProject) => void;
};

export default function CreateProjectForm(props: AddProjectFormProps) {
  const { onAddProject } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [languages, setLanguages] = useState('');
  const [frameworks, setFrameworks] = useState('');
  const [startDate, setStartDate] = useState('');
  const [status, setStatus] = useState('');
  const [endDate, setEndDate] = useState('');
  const [githubRep, setGithubRep] = useState<string>('');
  const [pictureURLs, setPictureURLs] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProject: CreateProject = {
      name,
      description,
      startDate: new Date(startDate), 
      endDate: new Date(endDate), 
      status,
      githubRep,
      tags: tags.split(',').map((tag) => tag.trim()), 
      languages: languages.split(',').map((lang) => lang.trim()), 
      frameworks: frameworks.split(',').map((fw) => fw.trim()), 
      pictureURLs: pictureURLs.split(',').map((pictureURL) => pictureURL.trim())
    };

    try {

      const result = await ofetch("http://localhost:3000/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newProject,  
      });

      console.log("New project added successfully", result);
      onAddProject(newProject);

      
      setName('');
      setStartDate('');
      setEndDate(''); 
      setStatus(''); 
      setDescription('');
      setTags(''); 
      setLanguages('');
      setFrameworks('');
      setGithubRep('');
      setPictureURLs('');
    } catch (error) {
      console.error("Error submitting the project:", error);
    }
  };

  return (
    <section id="form-section">
      <h3>Register a project</h3>
      <form id="projectForm" onSubmit={handleSubmit} method="post">
        <label htmlFor="name">Project Name:</label>
        <input
          type="text"
          id="name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the project name..."
        />

        <label htmlFor="description">Project description:</label>
        <textarea
          id="description"
          className="input"
          name="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your project description here..."
        />


      <label htmlFor="tags">Tags:</label>
        <textarea
          id="tags"
          className="input"
          name="tags"
          rows={2}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="List the tags for this project..."
        />
        <label htmlFor="languagesUsed">Languages used:</label>
        <textarea
          id="languagesUsed"
          className="input"
          name="languagesUsed"
          rows={2}
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          placeholder="List the languages used in the project..."
        />

        <label htmlFor="frameworksUsed">Frameworks used:</label>
        <textarea
          id="frameworksUsed"
          className="input"
          name="frameworksUsed"
          rows={2}
          value={frameworks}
          onChange={(e) => setFrameworks(e.target.value)}
          placeholder="List the frameworks used in the project..."
        />

        <label htmlFor="startDate">Start date:</label>
        <input
          type="date"
          id="startDate"
          className="input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="endDate">End date:</label>
        <input
          type="date"
          id="endDate"
          className="input"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <label htmlFor="Status">status:</label>
        <input
          type="text"
          id="status"
          className="input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Enter the project status..."
        />

        <label htmlFor="githubRepository">Github repository:</label>
        <input
          type="text"
          id="githubRepository"
          className="input"
          value={githubRep}
          onChange={(e) => setGithubRep(e.target.value)}
          placeholder="Enter the GitHub repository URL..."
        />

        <label htmlFor="projectPictureURLs">Project picture:</label>
        <input
          type="text"
          id="projectPictureURLs"
          className="input"
          value={pictureURLs}
          onChange={(e) => setPictureURLs(e.target.value)}
          placeholder="Enter the picture URLs..."
        />
        <button type="submit">Register</button>
      </form>
    </section>
  );
}
