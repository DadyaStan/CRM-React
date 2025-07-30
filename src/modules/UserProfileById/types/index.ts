// Интерфейс запроса для фильтрации и сортировки пользователей
export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean;
  limit?: number; // сколько на странице
  offset?: number; // страницу
}

// Интерфейс пользователя
export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: [boolean];
  roles: string[];
  phoneNumber: string;
}

// Интерфейс метаинформации
export interface MetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}
// Интерфейс для обновления прав пользователя
export interface UserRolesRequest {
  field: "isAdmin";
  value: boolean;
}

// Интерфейс для обновления данных пользователя
export interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}
