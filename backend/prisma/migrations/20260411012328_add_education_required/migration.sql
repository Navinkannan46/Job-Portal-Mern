-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "educationRequired" TEXT,
ADD COLUMN     "isRemote" BOOLEAN NOT NULL DEFAULT false;
