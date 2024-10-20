import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  // Først, sørg for at du har en student å knytte prosjektet til
  let student = await prisma.student.findFirst({
    where: { name: 'Maream Sefan' }, // Erstatt med riktig studentnavn
  })

  if (!student) {
    console.log('Student not found, creating a new one...')
    // Opprett en ny student hvis den ikke finnes
    student = await prisma.student.create({
      data: {
        name: 'Maream Sefan',
        degree: 'Computer Science',
        points: 100,
        email: 'mareamns@hiof.no', 
        pictureURL: 'https://itstud.hiof.no/~mareamns/M.png'
      },
    })
    console.log(`Created new student with ID: ${student.id}`)
  }

  // Opprett prosjektet og knytt språk og rammeverk
  const project = await prisma.project.create({
    data: {
      name: 'Project 1',
      description: 'A project to demonstrate seeding',
      startDate: new Date(),
      endDate: null,
      publishedAt: null, 
      status: "Draft",
      githubRep: 'https://github.com/Mareamsefan',
      tags:{ create: [
        { name: "React" }, 
        { name: "AI driven"}
      ]}, 
      pictureURLs: {
        create: [{ url: 'https://itstud.hiof.no/~mareamns/M.png' }],
      },
      studentId: student.id, // Sørg for at studentId er satt til den riktige studentens ID
      languages: {
        create: [
          { name: 'JavaScript' },
          { name: 'TypeScript' },
        ],
      },
      frameworks: {
        create: [{ name: 'React' }],
      },
    },
  })

  console.log(`Seeding finished. Project: ${project.name}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
