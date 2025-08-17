import { message } from "antd";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
  useCallback,
} from "react";
import { fetchUsers } from "../api";
import type { User, UserFilters } from "../types";
import { useSearchParams } from "react-router";

interface UsersTableContextType {
  tableData: User[];
  setTableData: (data: User[]) => void;
  filterSettings: UserFilters;
  setFilterSettings: (filters: UserFilters) => void;
  totalUsers: number;
  fetchAndSetUsers: () => Promise<void>;
  querySearch: any;
  setQuerySearch: (querySearch: any) => void;
}

export const UsersTableProvider = ({ children }: { children: ReactNode }) => {
  const [tableData, setTableData] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const [querySearch, setQuerySearch] = useSearchParams();

  const [filterSettings, setFilterSettings] = useState<UserFilters | any>({
    search: querySearch.get("search") ? querySearch.get("search") : "",
    sortBy: querySearch.get("sortBy") ? querySearch.get("sortBy") : undefined,
    sortOrder: querySearch.get("sortOrder")
      ? querySearch.get("sortOrder")
      : undefined,
    isBlocked: querySearch.get("isBlocked")
      ? querySearch.get("isBlocked")
      : undefined,
    limit: querySearch.get("limit") ? querySearch.get("limit") : undefined,
    offset: querySearch.get("offset") ? querySearch.get("offset") : undefined,
  });

  const fetchAndSetUsers = useCallback(async (): Promise<void> => {
    try {
      const response = await fetchUsers(filterSettings);
      if (response) {
        setTableData(response.data);
        setTotalUsers(response.meta.totalAmount);
      } else {
        setTableData([]);
      }
    } catch {
      message.error("Ошибка при загрузке пользователей");
    }
  }, [filterSettings]);

  const contextValue = useMemo(
    () => ({
      tableData,
      setTableData,
      filterSettings,
      setFilterSettings,
      totalUsers,
      fetchAndSetUsers,
      querySearch,
      setQuerySearch,
    }),
    [tableData, filterSettings, totalUsers, fetchAndSetUsers],
  );

  return (
    <UsersTableContext.Provider value={contextValue}>
      {children}
    </UsersTableContext.Provider>
  );
};

export const UsersTableContext = createContext<
  UsersTableContextType | undefined
>(undefined);

export const useUsersTable = (): UsersTableContextType => {
  const context = useContext(UsersTableContext);
  if (!context) {
    throw new Error("Конекст UsersTable должен использоваться");
  }
  return context;
};
