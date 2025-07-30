import { $api } from "@/shared/api/axiosClient";
import type { User } from "../types";

export const fetchUserData = async (
  userId: number,
): Promise<User | undefined> => {
  try {
    const response = await $api.get<User>(`/admin/users/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error(`Ошибка при запросе данных пользователя`);
  }
};
