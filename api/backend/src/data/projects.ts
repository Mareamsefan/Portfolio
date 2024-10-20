import { CreateProject } from "../features/projects/types";

export const projects: CreateProject[] = [
  {
    name: "NotCanvas",
    description: `A website for students to provide feedback to lecturers. The project emphasized security architecture, input validation, and securing against vulnerabilities.`,
    startDate: new Date("2024-01-22"),
    endDate: new Date("2024-05-01"),
    status: "completed",
    githubRep: "https://github.com/Mareamsefan/htdocs",
    languages: ["HTML", "CSS", "JavaScript", "PHP", "Regex"],
    frameworks: ["No framework used"],
    pictureURLs: ["https://itstud.hiof.no/~mareamns/NotCanvas.png"],
    tags: ["security", "feedback", "website"]
  },
  {
    name: "Harbor Simulation Framework",
    description: `Final exam project for simulating a harbor using a custom framework, developed in C# with .NET Framework and WPF.`,
    startDate: new Date("2024-01-22"),
    endDate: new Date("2024-05-31"),
    status: "completed",
    githubRep: "https://github.com/Mareamsefan/Cdull.V2024.HarborSimulation",
    languages: ["C#", "XAML"],
    frameworks: [".NET Framework", "WPF"],
    pictureURLs: ["https://itstud.hiof.no/~mareamns/HarborSimulation.jfif"],
    tags: ["simulation", "framework", "harbor"]
  },
  {
    name: "YourGuide MVP",
    description: `Developed a Minimum Viable Product (MVP) for a platform to buy and sell guided tours as part of my final exam in Software Development and Testing.`,
    startDate: new Date("2023-08-22"),
    endDate: new Date("2023-11-26"),
    status: "completed",
    githubRep: "https://github.com/Mareamsefan/Group18.YourGuide.Prototype",
    languages: ["Python", "HTML"],
    frameworks: ["Flask", "SQLAlchemy"],
    pictureURLs: ["https://itstud.hiof.no/~mareamns/YourGuide-MVP.png"],
    tags: ["mvp", "tour", "database"]
  }
];
