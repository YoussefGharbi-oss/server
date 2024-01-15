-- CreateTable
CREATE TABLE "Sprint" (
    "sprintId" TEXT NOT NULL,
    "SprintName" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "belongsTo" TEXT NOT NULL,

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("sprintId")
);

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_belongsTo_fkey" FOREIGN KEY ("belongsTo") REFERENCES "Project"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;
