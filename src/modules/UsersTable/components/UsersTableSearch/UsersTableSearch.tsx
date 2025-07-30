import Search from "antd/es/input/Search";
import "./UsersTableSearch.scss";
import { useUsersTable } from "../../hooks/useUsersTable";

const UsersTableSearch = () => {
  const { setFilterSettings, filterSettings } = useUsersTable();

  const handleSearchQuery = (value: string) => {
    setFilterSettings({
      ...filterSettings,
      offset: 1,
      search: value,
    });
  };

  return (
    <Search
      placeholder="Найти пользователя..."
      enterButton="Поиск"
      size="large"
      loading={false}
      onSearch={handleSearchQuery}
    />
  );
};

export default UsersTableSearch;
