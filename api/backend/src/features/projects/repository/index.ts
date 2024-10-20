import prisma from '../../../client/db'

export const getAllProjects = async () => {
    return await prisma.project.findMany({
      include: {
        languages: true,
        frameworks: true,
        pictureURLs: true, 
      },
    });
}
