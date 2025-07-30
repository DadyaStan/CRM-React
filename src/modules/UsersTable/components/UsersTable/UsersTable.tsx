import "./UsersTable.scss";

import React, { useEffect } from "react";
import UsersList from "../UsersList";
import UsersTablePagination from "../UsersTablePagination/UsersTablePagination";
import UsersTableSearch from "../UsersTableSearch";
import { UsersTableProvider, useUsersTable } from "../../hooks/useUsersTable";

const UsersTableInner: React.FC = () => {
  const { filterSettings, fetchAndSetUsers } = useUsersTable();

  useEffect(() => {
    fetchAndSetUsers();
  }, [filterSettings]);

  return (
    <>
      <UsersTableSearch />
      <br />
      <br />
      <UsersList />
      <br />
      <UsersTablePagination />
    </>
  );
};

const UsersTable: React.FC = () => {
  return (
    <UsersTableProvider>
      <UsersTableInner />
    </UsersTableProvider>
  );
};

export default UsersTable;
