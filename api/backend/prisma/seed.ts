import { PrismaClient} from "@prisma/client";
import { projects } from "../src/data/projects"; 
import { student } from "../src/data/student"; 

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create student along with their experiences
    const createdStudent = await prisma.student.create({
      data: {
        name: student.name,
        degree: student.degree,
        points: student.points,
        email: student.email,
        pictureURL: student.pictureURL,
        experiences: {
          create: student.experiences, 
        },
      },
    });

    console.log("Student created:", createdStudent);

    // Create projects
    for (const projectData of projects) {
      const createdProject = await prisma.project.create({
        data: {
          name: projectData.name,
          status:  projectData.status, 
          description: projectData.description,
          startDate: projectData.startDate,
          endDate: projectData.endDate, 
          githubRep: projectData.githubRep,
          tags: {
            create: projectData.tags.map((tag) => ({name: tag}))
          }, 
          languages: {
            create: projectData.languages.map((language) => ({ name: language })),
          },
          frameworks: {
            create: projectData.frameworks.map((framework) => ({ name: framework })),
          },
          pictureURLs: {
            create: projectData.pictureURLs.map((url) => ({ url })),
          },
          studentId: createdStudent.id, 
        },
      });

      console.log("Project created:", createdProject);
    }

  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
