import { useEffect, useRef, useState } from "react";
import { fetchUserData } from "../../api/fetchUserData";
import { updateUserData } from "../../api/updateUserData";
import { prepareDataForRequest } from "../../helpers/prepareDataForRequest";
import { Button, Descriptions, message, type DescriptionsProps } from "antd";
import type { User } from "../../types";

const UserProfileById = ({ userId }: { userId: number }) => {
  const [userData, setUserData] = useState<User>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Имя пользователя",
      children: (
        <>
          {!isEdit ? (
            <span>{userData?.username}</span>
          ) : (
            <input ref={userNameRef} defaultValue={userData?.username} />
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Эл. Почта",
      children: (
        <>
          {!isEdit ? (
            <span>{userData?.email}</span>
          ) : (
            <input ref={emailRef} defaultValue={userData?.email} />
          )}
        </>
      ),
    },
    {
      key: "3",
      label: "Номер телефона",
      children: (
        <>
          {!isEdit ? (
            <span>
              {userData?.phoneNumber ? userData?.phoneNumber : "Не привязан"}
            </span>
          ) : (
            <input ref={phoneNumberRef} defaultValue={userData?.phoneNumber} />
          )}
        </>
      ),
    },
    {
      key: "4",
      label: "Роль",
      children: <>{userData?.roles.slice(-1)}</>,
    },
  ];

  const fetchAndSetUserData = async () => {
    try {
      const response = await fetchUserData(userId);
      setUserData(response);
    } catch {
      message.error("Ошибка загрузки данных пользователя");
    }
  };

  useEffect(() => {
    fetchAndSetUserData();
  }, []);

  const changeIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleUpdateUserData = async () => {
    try {
      const preparedData = prepareDataForRequest(
        {
          username: userNameRef?.current?.value,
          email: emailRef?.current?.value,
          phoneNumber: phoneNumberRef?.current?.value,
        },
        userData,
      );

      if (preparedData) {
        const response = await updateUserData(userId, preparedData);
        setUserData(response);
        message.success("Данные пользователя успешно изменены");
      }
    } catch {
      message.error("Ошибка при изменении данных пользователя");
    } finally {
      setIsEdit(false);
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
            {isEdit ? (
              <>
                <Button
                  color="cyan"
                  variant="solid"
                  onClick={handleUpdateUserData}
                >
                  Сохранить
                </Button>
                <Button color="primary" variant="solid" onClick={changeIsEdit}>
                  Отменить
                </Button>
              </>
            ) : (
              <Button color="primary" variant="solid" onClick={changeIsEdit}>
                Изменить
              </Button>
            )}
          </div>
        }
      ></Descriptions>
    </div>
  );
};

export default UserProfileById;
