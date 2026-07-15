-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'EMPLOYER', 'ADMIN');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('OPEN', 'CLOSED', 'DRAFT');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLIED', 'SHORTLISTED', 'PENDING', 'REVIEWING', 'HIRED', 'REJECTED');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "phone" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skills" TEXT[],
    "resume" TEXT,
    "location" TEXT,
    "expectedSalary" DOUBLE PRECISION,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT,
    "isCurrentJob" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "fieldOfStudy" TEXT,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "location" TEXT,
    "industry" TEXT,
    "companySize" TEXT,
    "foundedYear" INTEGER,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "designation" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "postedById" TEXT NOT NULL,
    "skillsRequired" TEXT[],
    "location" TEXT,
    "jobType" "JobType" NOT NULL,
    "experienceRequired" INTEGER,
    "salaryMin" DOUBLE PRECISION,
    "salaryMax" DOUBLE PRECISION,
    "status" "JobStatus" NOT NULL DEFAULT 'OPEN',
    "expiresAt" TIMESTAMP(3),
    "applicantsCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "resume" TEXT,
    "coverLetter" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE INDEX "Experience_userProfileId_idx" ON "Experience"("userProfileId");

-- CreateIndex
CREATE INDEX "Education_userProfileId_idx" ON "Education"("userProfileId");

-- CreateIndex
CREATE INDEX "Company_name_idx" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EmployerProfile_userId_key" ON "EmployerProfile"("userId");

-- CreateIndex
CREATE INDEX "EmployerProfile_companyId_idx" ON "EmployerProfile"("companyId");

-- CreateIndex
CREATE INDEX "Job_title_idx" ON "Job"("title");

-- CreateIndex
CREATE INDEX "Job_location_idx" ON "Job"("location");

-- CreateIndex
CREATE INDEX "Application_jobId_idx" ON "Application"("jobId");

-- CreateIndex
CREATE INDEX "Application_applicantId_idx" ON "Application"("applicantId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_jobId_applicantId_key" ON "Application"("jobId", "applicantId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployerProfile" ADD CONSTRAINT "EmployerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployerProfile" ADD CONSTRAINT "EmployerProfile_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
