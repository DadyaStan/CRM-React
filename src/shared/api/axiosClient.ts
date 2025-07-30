import axios from "axios";
import tokenService from "./token.service";

const BASE_API = "https://easydev.club/api/v1";

export const $api = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

$api.interceptors.request.use(
  async (config) => {
    const token = tokenService.getToken();

    const expiresIn = tokenService.getTokenExpiration();

    if (token && expiresIn < 100) {
      const newAccessToken = await refreshToken();
      config.headers.Authorization = `Bearer ${newAccessToken}`;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const newAccessToken = await refreshToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return $api.request(originalRequest);
      } catch {
        console.error(`Ошибка запроса: ${error.response}`);
        logout();
      }
    }

    return Promise.reject(error);
  },
);

export const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem("refreshToken");

    if (tokenService.getToken()) {
      await $api.post<void>(`${BASE_API}/user/logout`);
    }
    tokenService.removeToken();
  } catch (error) {
    console.error(`Ошибка при логауте: ${error}`);
    throw error;
  }
};

export const refreshToken = async (): Promise<string> => {
  try {
    const response = await axios.post(`${BASE_API}/auth/refresh`, {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    tokenService.setToken(response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    return response.data.accessToken;
  } catch (error) {
    console.error("Ошибка обновления токена: ", error);
    throw error;
  }
};
