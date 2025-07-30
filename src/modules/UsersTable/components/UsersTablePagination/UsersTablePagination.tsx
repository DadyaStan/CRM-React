import "./UsersTablePagination.scss";

import { Pagination, type PaginationProps } from "antd";
import { useUsersTable } from "../../hooks/useUsersTable";

const UsersTablePagination = () => {
  const { totalUsers, setFilterSettings, filterSettings } = useUsersTable();

  const handleChangePagination: PaginationProps["onChange"] = (
    pageNumber,
    pageSize,
  ) => {
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
        defaultCurrent={1}
        defaultPageSize={20}
        total={totalUsers}
        onChange={handleChangePagination}
      />
    </div>
  );
};

export default UsersTablePagination;
