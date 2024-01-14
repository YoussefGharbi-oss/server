/*
  Warnings:

  - Added the required column `projectManager` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectManager" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_projectManager_fkey" FOREIGN KEY ("projectManager") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
