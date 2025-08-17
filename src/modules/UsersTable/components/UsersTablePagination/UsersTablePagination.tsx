import "./UsersTablePagination.scss";

import { Pagination, type PaginationProps } from "antd";
import { useUsersTable } from "../../hooks/useUsersTable";

const UsersTablePagination = () => {
  const {
    totalUsers,
    setFilterSettings,
    filterSettings,
    querySearch,
    setQuerySearch,
  } = useUsersTable();

  const handleChangePagination: PaginationProps["onChange"] = (
    pageNumber,
    pageSize,
  ) => {
    setQuerySearch({
      ...Object.fromEntries(querySearch),
      limit: pageSize,
      offset: pageNumber,
    });
    setFilterSettings({
      ...filterSettings,
      limit: pageSize,
      offset: pageNumber,
    });
  };

  return (
    <div className="pagination__box">
      <Pagination
        align="center"
        defaultCurrent={
          querySearch.get("offset") ? querySearch.get("offset") : 1
        }
        defaultPageSize={
          querySearch.get("limit") ? querySearch.get("limit") : 20
        }
        total={totalUsers}
        onChange={handleChangePagination}
      />
    </div>
  );
};

export default UsersTablePagination;
