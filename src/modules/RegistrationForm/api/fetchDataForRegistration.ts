import type { UserRegistration, Profile } from "../types/registration";

import { $api } from "@shared/api/axiosClient";

export const fetchDataForRegistration = async (
  registrationData: UserRegistration,
) => {
  try {
    const response = await $api.post<Profile>("/auth/signup", registrationData);

    if (response.status === 201) {
      return response;
    }
  } catch (error: any) {
    if (error.status === 400) {
      alert(
        "400 Bad Request: Ошибка десериализации запроса или неверный ввод.",
      );
    } else if (error.status === 409) {
      alert("409 Conflict: Пользователь уже существует.");
    } else if (error.status === 500) {
      alert("500 Internal Server Error: Внутренняя ошибка сервера.");
    }

    throw error;
  }
};
