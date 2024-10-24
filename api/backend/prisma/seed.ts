import { PrismaClient } from '@prisma/client';
import { projects } from "../src/data/projects"; 
import { user } from "../src/data/user"; 
import { ProjectDB } from '@/features/projects/types';
import { UserDB } from '@/features/user/types';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create user along with their experiences
    const createdUser:UserDB = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: user.name,
        degree: user.degree,
        points: user.points,
        email: user.email,
        pictureURL: user.pictureURL,
        experiences: user.experiences
      },
    });

    console.log("Student created:", createdUser);

    for (const projectData of projects) {
      const createdProject:ProjectDB = await prisma.project.create({
        data: {
          id: crypto.randomUUID(), 
          name: projectData.name,
          status:  projectData.status, 
          description: projectData.description,
          startDate: projectData.startDate,
          endDate: projectData.endDate, 
          githubRep: projectData.githubRep,
          userId: createdUser.id,
          tags: JSON.stringify(projectData.tags), 
          languages: JSON.stringify(projectData.languages),
          frameworks: JSON.stringify(projectData.frameworks),
          pictureURLs: JSON.stringify(projectData.pictureURLs), 
          
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


seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
