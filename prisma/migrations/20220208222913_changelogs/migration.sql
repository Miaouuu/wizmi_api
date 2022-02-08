-- CreateTable
CREATE TABLE "Changelogs" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(240) NOT NULL,
    "description" TEXT NOT NULL,
    "author" VARCHAR(240) NOT NULL,
    "project" VARCHAR(240) NOT NULL,
    "releaseId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Changelogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Releases" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(240) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Releases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Changelogs" ADD CONSTRAINT "Changelogs_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Releases"("id") ON DELETE SET NULL ON UPDATE CASCADE;
