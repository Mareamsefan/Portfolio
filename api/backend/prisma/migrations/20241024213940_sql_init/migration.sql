-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "publishedAt" DATETIME,
    "status" TEXT NOT NULL,
    "githubRep" TEXT NOT NULL,
    "userId" TEXT,
    "tags" TEXT NOT NULL,
    "languages" TEXT NOT NULL,
    "frameworks" TEXT NOT NULL,
    "pictureURLs" TEXT NOT NULL,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "email" TEXT,
    "pictureURL" TEXT,
    "experiences" TEXT NOT NULL
);
