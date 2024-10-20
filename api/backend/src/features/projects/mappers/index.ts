export const mapProject = (project: any) => {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      githubRepo: project.githubRep,
      pictureURLs: project.pictureURLs,
      languages: project.languages,
      frameworks: project.frameworks
    };
  };
  