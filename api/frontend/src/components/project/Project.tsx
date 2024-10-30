import { useState } from "react";
import { Project as ProjectProps } from "./types";
import { format } from "date-fns";
import { endpoints } from "../../config/urls";

export default function Project(project: ProjectProps &
    {onRemoveProject: (id:string) => void;} &
    {onUpdateProject:(id: string) => void;}) {
    const {
        id,
        name,
        description,
        languages,
        frameworks,
        tags,
        startDate,
        endDate,
        status,
        githubRep,
        pictureURLs, 
        onUpdateProject, 
        onRemoveProject
    } = project;


    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...project });

    // Funksjon for å slette prosjektet
    const handleRemoveProject = async () => {
        try {
            const result = await fetch(`${endpoints.projects}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            onRemoveProject(id);
            console.log(result.da)
        } catch (error) {
            console.error("Error deleting the project:", error);
        }
    };

    // Funksjon for å starte redigeringsmodus
    const handleEditProject = () => {
        setIsEditing(true);
    };

    // Funksjon for å lagre endringer
    const handleSaveProject = async () => {
        try {
            const response = await fetch(`${endpoints.projects}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editData),
            });
            const updatedProject = await response.json();
            onUpdateProject(updatedProject.id);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating the project:", error);
        }
    };

    // Funksjon for å avbryte redigering
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData({ ...project });
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return format(date, 'yyyy-MM-dd');
    };

    return (
        <section className="project-detail">
            {isEditing ? (
                <form>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={editData.description}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        />
                    </label>
                    <label>
                        Languages:
                        <input
                            type="text"
                            value={editData.languages.join(', ')}
                            onChange={(e) =>
                                setEditData({ ...editData, languages: e.target.value.split(',').map(l => l.trim()) })
                            }
                        />
                    </label>
                    <label>
                        Frameworks:
                        <input
                            type="text"
                            value={editData.frameworks.join(', ')}
                            onChange={(e) =>
                                setEditData({ ...editData, frameworks: e.target.value.split(',').map(f => f.trim()) })
                            }
                        />
                    </label>
                    <label>
                        Tags:
                        <input
                            type="text"
                            value={editData.tags.join(', ')}
                            onChange={(e) =>
                                setEditData({ ...editData, tags: e.target.value.split(',').map(t => t.trim()) })
                            }
                        />
                    </label>
                    <label>
                        GitHub Repository:
                        <input
                            type="url"
                            value={editData.githubRep}
                            onChange={(e) => setEditData({ ...editData, githubRep: e.target.value })}
                        />
                    </label>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={formatDate(editData.startDate)} // Format for visning
                            onChange={(e) => setEditData({ ...editData, startDate: new Date(e.target.value) })}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            value={editData.endDate ? formatDate(editData.endDate) : ''}
                            onChange={(e) => setEditData({ ...editData, endDate: new Date(e.target.value) || null })}
                        />
                    </label>
                    <label>
                        Status:
                        <select
                            value={editData.status}
                            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                        >
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="on hold">On Hold</option>
                        </select>
                    </label>
                    <button type="button" onClick={handleSaveProject}>Save Changes</button>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </form>
            ) : (
                <div>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p><strong>Languages:</strong> {languages.join(', ')}</p>
                    <p><strong>Frameworks:</strong> {frameworks.join(', ')}</p>
                    <p><strong>Tags:</strong> {tags.join(', ')}</p>
                    <p><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {endDate ? new Date(endDate).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Status:</strong> {status}</p>
                    <p><a href={githubRep} target="_blank" rel="noopener noreferrer">GitHub Repository</a></p>
                    {pictureURLs && (
                        <div>
                            {pictureURLs.map((url, index) => (
                                <img key={index} src={url} alt={`Project image ${index + 1}`} />
                            ))}
                        </div>
                    )}
                    <button type="button" onClick={handleEditProject}>Edit Project</button>
                    <button type="button" onClick={handleRemoveProject}>Delete Project</button>
                </div>
            )}
        </section>
    );
}
