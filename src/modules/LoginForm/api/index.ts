import { $api } from "@api/axiosClient";
import tokenService from "@/shared/api/token.service";
import type { Token, AuthData, Profile } from "../types/login";

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
    console.error(`Ошибка при логине: ${error}`);
    throw error;
  }
};

export const fetchAndSetRole = async (): Promise<void> => {
  try {
    const response = await $api.get<Profile>("/user/profile");

    const userRole = response.data.roles.includes("ADMIN") ? "ADMIN" : "USER";
    if (userRole) {
      localStorage.setItem('userRole', userRole)
    }
  } catch (error) {
    console.error(`Ошибка при загрузке профиля: ${error}`);
    throw error;
  }
};
