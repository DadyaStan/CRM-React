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

interface UsersTableContextType {
  tableData: User[];
  setTableData: (data: User[]) => void;
  filterSettings: UserFilters;
  setFilterSettings: (filters: UserFilters) => void;
  totalUsers: number;
  fetchAndSetUsers: () => Promise<void>;
}

export const UsersTableProvider = ({ children }: { children: ReactNode }) => {
  const [tableData, setTableData] = useState<User[]>([]);
  const [filterSettings, setFilterSettings] = useState<UserFilters>({
    search: "",
    sortBy: undefined,
    sortOrder: undefined,
    isBlocked: undefined,
    limit: undefined,
    offset: undefined,
  });

  const [totalUsers, setTotalUsers] = useState<number>(0);

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
