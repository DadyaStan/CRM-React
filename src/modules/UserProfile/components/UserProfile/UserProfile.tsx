import "./UserProfile.scss";

import React, { useEffect, useState } from "react";
import { Button, Descriptions, message } from "antd";
import type { DescriptionsProps } from "antd";

import { fetchProfile } from "../../api/fetchProfile";
import { useNavigate } from "react-router";
import { logout } from "@api/axiosClient";
import type { Profile } from "../../types";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<Profile | null>(null);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Имя пользователя",
      span: 'filled',
      children: <span>{userData?.username}</span>,
    },
    {
      key: "2",
      label: "Эл. Почта",
      span: 'filled',
      children: <span>{userData?.email}</span>,
    },
    {
      key: "3",
      label: "Номер телефона",
      span: 'filled',
      children: (
        <span>
          {userData?.phoneNumber ? userData?.phoneNumber : "Не привязан"}
        </span>
      ),
    },
    {
      key: "4",
      label: "Роль",
      span: 'filled',
      children: <span>{userData?.roles.join(", ")}</span>,
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resUserData = await fetchProfile();
        setUserData(resUserData);
        console.log(resUserData);
      } catch {
        message.error("Ошибка при загрузки профиля");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch {
      message.error("Ошибка при логауте");
    }
  };

  return (
    <div className="user-profile">
      <Descriptions
        title="Профиль пользователя"
        layout="horizontal"
        items={items}
        extra={
          <div className="user-profile__btn-box">
            <Button color="danger" variant="solid" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default UserProfile;
