import { $api } from "@api/axiosClient";
import tokenService from "@/shared/api/token.service";
import type { Token, AuthData } from "../types/login";

export const signin = async (loginData: AuthData): Promise<Token | void> => {
  try {
    const response = await $api.post<Token>("/auth/signin", loginData);

    if (response.status === 200) {
      tokenService.setToken(response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      console.log(response);
      return response.data;
    }
  } catch (error: any) {
    if (error.status === 400) {
      alert("Bad Request: Ошибка десериализации запроса или неверный ввод.");
    } else if (error.status === 401) {
      alert("401 Unauthorized: Неверные учетные данные.");
    } else if (error.status === 500) {
      alert("500 Internal Server Error: Внутренняя ошибка сервера.");
    }

    console.error(`Ошибка при логине: ${error}`);
    throw error;
  }
};
