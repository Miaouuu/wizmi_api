-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Types" AS ENUM ('SQUARE');

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(240) NOT NULL,
    "userId" INTEGER NOT NULL,
    "communityLevelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityLevels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "reward" VARCHAR(255),
    "userId" INTEGER NOT NULL,
    "data" JSON NOT NULL,
    "type" "Types" NOT NULL DEFAULT E'SQUARE',
    "certified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityLevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinishedCommunityLevels" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "communityLevelId" INTEGER NOT NULL,
    "clearTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "communityLevelsId" INTEGER,

    CONSTRAINT "FinishedCommunityLevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinishedLevels" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,
    "clearTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinishedLevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Levels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "reward" TEXT NOT NULL,
    "worldId" INTEGER NOT NULL,
    "data" JSON NOT NULL,
    "type" "Types" NOT NULL DEFAULT E'SQUARE',

    CONSTRAINT "Levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "value" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "communityLevelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "roles" "Roles"[],

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Worlds" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Worlds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_communityLevelId_fkey" FOREIGN KEY ("communityLevelId") REFERENCES "CommunityLevels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityLevels" ADD CONSTRAINT "CommunityLevels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedCommunityLevels" ADD CONSTRAINT "FinishedCommunityLevels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedCommunityLevels" ADD CONSTRAINT "FinishedCommunityLevels_communityLevelId_fkey" FOREIGN KEY ("communityLevelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedCommunityLevels" ADD CONSTRAINT "FinishedCommunityLevels_communityLevelsId_fkey" FOREIGN KEY ("communityLevelsId") REFERENCES "CommunityLevels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedLevels" ADD CONSTRAINT "FinishedLevels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedLevels" ADD CONSTRAINT "FinishedLevels_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Levels" ADD CONSTRAINT "Levels_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "Worlds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_communityLevelId_fkey" FOREIGN KEY ("communityLevelId") REFERENCES "CommunityLevels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
