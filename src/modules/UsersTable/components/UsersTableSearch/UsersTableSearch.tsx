import Search from "antd/es/input/Search";
import "./UsersTableSearch.scss";
import { useUsersTable } from "../../hooks/useUsersTable";

const UsersTableSearch = () => {
  const { setFilterSettings, filterSettings, querySearch, setQuerySearch } =
    useUsersTable();

  const handleSearchQuery = (value: string) => {
    setQuerySearch({ ...Object.fromEntries(querySearch), search: value });
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
      defaultValue={querySearch.has("search") ? querySearch.get("search") : ""}
    />
  );
};

export default UsersTableSearch;
