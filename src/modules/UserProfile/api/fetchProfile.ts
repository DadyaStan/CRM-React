import type { Profile } from "../types";
import { $api } from "@/shared/api/axiosClient";

export const fetchProfile = async (): Promise<Profile> => {
  try {
    const response = await $api.get<Profile>("/user/profile");

    return response.data;
  } catch (error) {
    console.error(`Ошибка при загрузке профиля: ${error}`);
    throw error;
  }
};
