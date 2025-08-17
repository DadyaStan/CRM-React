import "./UsersList.scss";

import { Table, Tag, type TablePaginationConfig } from "antd";
import { useUsersTable } from "../../hooks/useUsersTable";
import Column from "antd/es/table/Column";
import { Link } from "react-router";

import UserActionsBlock from "../UserActionsBlock";
import type { User } from "../../types";

interface UserTableSorter {
  column: {
    dataIndex: string;
    key: string;
    sorter: boolean;
    title: string;
  };
  columnKey: string;
  field: string;
  order: string;
}

interface UserTableFilters {
  isBlocked?: [boolean];
}

const UsersList = () => {
  const {
    tableData,
    filterSettings,
    setFilterSettings,
    querySearch,
    setQuerySearch,
  } = useUsersTable();

  const handleChangeFilter = (
    _pagination: TablePaginationConfig,
    filters: UserTableFilters,
    sorter: UserTableSorter | any,
  ) => {
    setQuerySearch({
      ...Object.fromEntries(querySearch),
      sortBy: sorter.order === undefined ? "id" : sorter.columnKey,
      sortOrder: sorter.order === "descend" ? "desc" : "asc",
      isBlocked:
        filters.isBlocked?.length === 1 ? filters.isBlocked[0] : undefined,
    });
    setFilterSettings({
      ...filterSettings,
      sortBy: sorter.order === undefined ? "id" : sorter.columnKey,
      sortOrder: sorter.order === "descend" ? "desc" : "asc",
      isBlocked:
        filters.isBlocked?.length === 1 ? filters.isBlocked[0] : undefined,
    });
  };

  return (
    <div className="users-table">
      <Table
        dataSource={tableData}
        pagination={false}
        onChange={handleChangeFilter}
        key="1"
      >
        <Column
          title="Имя пользователя"
          dataIndex="username"
          key="username"
          sorter={true}
          defaultSortOrder={
            querySearch.get("sortBy") === "username"
              ? querySearch.get("sortOrder")
              : undefined
          }
          render={(tag, record) => {
            return (
              <Link
                to={`/user/${record.id}`}
                state={{
                  searchParams: Object.fromEntries(querySearch),
                }}
              >
                <p>{tag}</p>
              </Link>
            );
          }}
        />
        <Column
          title="E-mail"
          dataIndex="email"
          key="email"
          sorter={true}
          defaultSortOrder={
            querySearch.get("sortBy") === "email"
              ? querySearch.get("sortOrder")
              : undefined
          }
        />
        <Column title="Дата создания" dataIndex="date" key="date" />
        <Column
          title="Статус"
          dataIndex="isBlocked"
          key="isBlocked"
          defaultFilteredValue={
            querySearch.get("isBlocked")
              ? querySearch.get("isBlocked")
              : undefined
          }
          filters={[
            { text: "Заблокированные", value: true },
            { text: "Активные", value: false },
          ]}
          filterMultiple={false}
          render={(item) => (item ? "Заблокирован" : "Активен")}
        />
        <Column
          title="Роль"
          dataIndex="roles"
          key="roles"
          render={(tags: string[]) => (
            <>
              {tags.map((tag) => {
                let color = tag === "USER" ? "geekblue" : "green";
                if (tag === "ADMIN") {
                  color = "volcano";
                }
                return <Tag color={color}>{tag.toUpperCase()}</Tag>;
              })}
            </>
          )}
        />
        <Column
          title="Номер телефона"
          dataIndex="phoneNumber"
          key="phoneNumber"
          render={(item) => (item.length > 1 ? item : "-")}
        />
        <Column
          title="Действия"
          dataIndex="username"
          key="actions"
          render={(_username, record) => {
            return <UserActionsBlock props={record as User} />;
          }}
        />
      </Table>
    </div>
  );
};

export default UsersList;
