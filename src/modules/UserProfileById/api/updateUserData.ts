import { $api } from "@/shared/api/axiosClient";
import type { User, UserRequest } from "../types";

export const updateUserData = async (
  userId: number,
  newData: UserRequest,
): Promise<User> => {
  try {
    const response = await $api.put<User>(`/admin/users/${userId}`, newData);

    return response.data;
  } catch (error) {
    throw new Error(`Ошибка при изменении профиля пользователя`);
  }
};
