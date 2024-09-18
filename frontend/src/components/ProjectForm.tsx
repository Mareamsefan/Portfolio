
const ProjectForm = () => {
    return (
        <section id="form-section">
      <h3>Register a project</h3>
      <form id="projectForm" >
        <label htmlFor="name">Project Name:</label>
        <input
          type="text"
          id="name"
          className="input"
          placeholder="Enter the project name..."
        />

        <label htmlFor="roleAndResponsibilities">Role and responsibilities:</label>
        <textarea
          id="roleAndResponsibilities"
          className="input"
          name="roleAndResponsibilities"
          rows={4}
          placeholder="Describe your role and responsibilities..."
        />

        <label htmlFor="description">Project description:</label>
        <textarea
          id="description"
          className="input"
          name="description"
          rows={4}
          placeholder="Enter your project description here..."
        />

        <label htmlFor="languagesUsed">Languages used:</label>
        <textarea
          id="languagesUsed"
          className="input"
          name="languagesUsed"
          rows={2}
          placeholder="List the languages used in the project..."
        />

        <label htmlFor="frameworksUsed">Frameworks used:</label>
        <textarea
          id="frameworksUsed"
          className="input"
          name="frameworksUsed"
          rows={2}
          placeholder="List the frameworks used in the project..."

        />

        <label htmlFor="startDate">Start date:</label>
        <input
          type="date"
          id="startDate"
          className="input"
          placeholder="Select the start date..."
        />

        <label htmlFor="githubRepository">Github repository:</label>
        <input
          type="text"
          id="githubRepository"
          className="input"
          placeholder="Enter the GitHub repository URL..."
        />

        <label htmlFor="projectPictureURL">Project picture:</label>
        <input
          type="text"
          id="projectPictureURL"
          className="input"
          placeholder="Enter the picture URL..."
        />

        <button type="submit">Register</button>
      </form>
    </section>
    
    ); 
};

export default ProjectForm; 