import { useState } from "react";
import { CreateProject, Project, ProjectCreateSchema } from "./types";
import { randomUUID } from "crypto";

type AddProjectFormProps = {
  onAddProject: ({
    name,
    roleAndResponsibilities,
    description, 
    languagesUsed, 
    frameworksUsed, 
    startDate, 
    githubRepository, 
    pictureURL}: Project) => void; 

} 
export default function CreateProjectForm(props: AddProjectFormProps){
  const {onAddProject} = props; 
  const [formData, setFormData] = useState<CreateProject>({
    name: '',
    roleAndResponsibilities: '',
    description: '',
    languagesUsed: [],
    frameworksUsed: [],
    startDate: new Date(),
    githubRepository: '',
    pictureURL: ''
  });

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    //validering med zod-skjema jeg allerede har fra forrige innlevering: 
    const result = ProjectCreateSchema.safeParse(formData); 

    if (result.success){
      // sender til server her senere 
      console.error('Validation project:', result.data)
      onAddProject({
       ...formData, id:crypto.randomUUID()
      })
      //reseter staten
      setFormData({
        name: '',
        roleAndResponsibilities: '',
        description: '',
        languagesUsed: [],
        frameworksUsed: [],
        startDate: new Date(),
        githubRepository: '',
        pictureURL: ''
      });
    } else {
      console.error('Validation failed', result.error.format())
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    
    const { name, value } = e.target;

    if (name === 'languagesUsed' || name === 'frameworksUsed') {
      setFormData({
        ...formData,
        [name]: value.split(',').map(lang => lang.trim()) 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value 
      });
    }
  };

    return (
      <section id="form-section">
        <h3>Register a project</h3>
        <form id="projectForm" onSubmit={handelSubmit}>
          <label htmlFor="name">Project Name:</label>
          <input
            type="text"
            id="name"
            className="input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter the project name..."
          />

          <label htmlFor="roleAndResponsibilities">Role and responsibilities:</label>
          <textarea
            id="roleAndResponsibilities"
            className="input"
            name="roleAndResponsibilities"
            rows={4}
            value={formData.roleAndResponsibilities}
            onChange={handleChange}
            placeholder="Describe your role and responsibilities..."
          />

          <label htmlFor="description">Project description:</label>
          <textarea
            id="description"
            className="input"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter your project description here..."
          />

          <label htmlFor="languagesUsed">Languages used:</label>
          <textarea
            id="languagesUsed"
            className="input"
            name="languagesUsed"
            rows={2}
            value={formData.languagesUsed}
            onChange={handleChange}
            placeholder="List the languages used in the project..."
          />

          <label htmlFor="frameworksUsed">Frameworks used:</label>
          <textarea
            id="frameworksUsed"
            className="input"
            name="frameworksUsed"
            rows={2}
            value={formData.frameworksUsed}
            onChange={handleChange}
            placeholder="List the frameworks used in the project..."

          />

          <label htmlFor="startDate">Start date:</label>
          <input
            type="date"
            id="startDate"
            className="input"
            value={formData.startDate.toDateString()}
            onChange={handleChange}
            placeholder="Select the start date..."
          />

          <label htmlFor="githubRepository">Github repository:</label>
          <input
            type="text"
            id="githubRepository"
            className="input"
            value={formData.githubRepository}
            onChange={handleChange}
            placeholder="Enter the GitHub repository URL..."
          />

          <label htmlFor="projectPictureURL">Project picture:</label>
          <input
            type="text"
            id="projectPictureURL"
            className="input"
            value={formData.pictureURL}
            onChange={handleChange}
            placeholder="Enter the picture URL..."
          />

          <button type="submit">Register</button>
        </form>
    </section>
    
    ); 
};

