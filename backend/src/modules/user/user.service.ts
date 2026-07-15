import * as userRepository from "./user.repository";
import { AppError } from "../../common/errors/AppError";

export const getProfile = async (userId: string) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const updateProfile = async (userId: string, data: any) => {
  const { experiences, educations, ...userData } = data;

  // Separate user and profile data
  const userFields = ["name", "email", "phone"];
  const profileFields = [
    "bio",
    "skills",
    "resume",
    "location",
    "expectedSalary",
  ];

  const userUpdate: any = {};
  const profileUpdate: any = {};

  Object.keys(userData).forEach((key) => {
    if (userFields.includes(key)) userUpdate[key] = userData[key];
    if (profileFields.includes(key)) profileUpdate[key] = userData[key];
  });

  // Update user basic info
  if (Object.keys(userUpdate).length > 0) {
    await userRepository.update(userId, userUpdate);
  }

  // Update/Upsert profile
  if (Object.keys(profileUpdate).length > 0 || experiences || educations) {
    const profile = await userRepository.upsertProfile(userId, profileUpdate);

    if (experiences) {
      await userRepository.updateExperiences(profile.id, experiences);
    }

    if (educations) {
      await userRepository.updateEducations(profile.id, educations);
    }
  }

  return userRepository.findById(userId);
};

export const getMyApplications = async (userId: string) => {
  const user = await userRepository.getMyApplications(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};
