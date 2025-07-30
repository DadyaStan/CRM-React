import "./UserActionsBlock.scss";

import { ArrowRightOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, message, Popover, Space } from "antd";
import { NavLink } from "react-router";

import {
  changeUserRights,
  blockUser,
  unblockUser,
  deleteUser,
} from "../../api";

import { useUsersTable } from "../../hooks/useUsersTable";

import AsyncModal from "@/components/AsyncModal";
import type { User } from "../../types";

const UserActionsBlock = ({ props }: { props: User }) => {
  const { fetchAndSetUsers } = useUsersTable();

  const handleRemoveAdmin = async (userId: number) => {
    try {
      await changeUserRights(userId, ["USER"]);
      await fetchAndSetUsers();
      message.success(`Пользователь ${props.username} понижен в правах`);
    } catch {
      message.error(`Ошибка при изменении прав пользователя`);
    }
  };

  const handleMakeAdmin = async (userId: number) => {
    try {
      await changeUserRights(userId, ["USER", "ADMIN"]);
      await fetchAndSetUsers();
      message.success(`Пользователь ${props.username} повышен в правах`);
    } catch {
      message.error(`Ошибка при изменении прав пользователя`);
    }
  };

  const handleChangeUserStatus = async (userId: number) => {
    try {
      if (props.isBlocked) {
        await unblockUser(userId);
      } else {
        await blockUser(userId);
      }
      await fetchAndSetUsers();
      message.success("успешно");
    } catch {
      message.error("Не успешно");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      await fetchAndSetUsers();
      message.success(`Пользователь ${props.username} успешно удалён`);
    } catch {
      message.error(`Ошибка при удалении пользователя`);
    }
  };

  const PopoverActions = () => {
    return (
      <div className="user-popover-actions">
        {props.roles.includes("ADMIN") ? (
          <>
            <AsyncModal
              username={props.username}
              userId={props.id}
              actionText={`Вы действительно хотите отменить права администратора пользователя ${props.username}?`}
              handleAction={handleRemoveAdmin}
            >
              <Button color="primary" variant="solid">
                Сделать пользователем
              </Button>
            </AsyncModal>
          </>
        ) : (
          <>
            <AsyncModal
              username={props.username}
              userId={props.id}
              actionText={`Вы действительно хотите сделать пользователя ${props.username} администратором?`}
              handleAction={handleMakeAdmin}
            >
              <Button color="primary" variant="solid">
                Сделать администратором
              </Button>
            </AsyncModal>
          </>
        )}

        <AsyncModal
          username={props.username}
          userId={props.id}
          actionText="Вы действительно хотите удалить пользователя?"
          handleAction={handleDeleteUser}
        >
          <Button color="danger" variant="solid">
            Удалить
          </Button>
        </AsyncModal>
      </div>
    );
  };

  return (
    <Space size="middle">
      <AsyncModal
        username={props.username}
        userId={props.id}
        actionText="Вы действительно хотите изменить статус пользователя?"
        handleAction={handleChangeUserStatus}
      >
        <Button color="default" variant="outlined">
          {props.isBlocked ? "Разблок" : "Блок"}
        </Button>
      </AsyncModal>
      <NavLink to={`/user/${props.id}`}>
        <Button color="default" variant="outlined">
          <ArrowRightOutlined />
        </Button>
      </NavLink>
      <Popover
        placement="bottomRight"
        title="Выберите действие"
        content={PopoverActions}
      >
        <Button color="default" variant="text">
          <MoreOutlined />
        </Button>
      </Popover>
    </Space>
  );
};

export default UserActionsBlock;
