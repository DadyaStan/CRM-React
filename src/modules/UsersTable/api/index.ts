import { $api } from "@api/axiosClient";
import type { UserFilters, User, MetaResponse, UserRequest } from "../types";

export const fetchUsers = async (
  filterData?: UserFilters,
): Promise<MetaResponse<User>> => {
  try {
    let args;

    if (filterData) {
      args = {
        params: {
          search: filterData.search,
          sortBy: filterData.sortBy,
          sortOrder: filterData.sortOrder,
          isBlocked: filterData.isBlocked,
          limit: filterData.limit,
          offset: filterData.offset ? filterData.offset - 1 : undefined,
        },
      };
    }
    const response = await $api.get<MetaResponse<User>>("/admin/users", args);
    console.log("INPUT: ", filterData);
    console.log("OUTPUT: ", response);

    return response.data;
  } catch (error) {
    throw new Error(`Ошибка при запросе списка пользователей`);
  }
};

export const changeUserData = async (
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

export const changeUserRights = async (
  userId: number,
  newData: any,
): Promise<User> => {
  try {
    const response = await $api.post<User>(`/admin/users/${userId}/rights`, {
      roles: newData,
    });

    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Ошибка при изменении прав пользователя`);
  }
};

export const blockUser = async (userId: number): Promise<User> => {
  try {
    const response = await $api.post<User>(`/admin/users/${userId}/block`);

    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Ошибка при блокировке пользователя`);
  }
};

export const unblockUser = async (userId: number): Promise<User> => {
  try {
    const response = await $api.post<User>(`/admin/users/${userId}/unblock`);

    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Ошибка при разблокировки пользователя`);
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await $api.delete<void>(`/admin/users/${userId}`);
  } catch (error) {
    throw new Error(`Ошибка при удалении пользователя`);
  }
};
