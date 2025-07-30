import React, { useState } from "react";
import { Modal } from "antd";

interface AsyncModalProps {
  username: string;
  userId: number;
  actionText: string;
  handleAction: (userId: number) => Promise<void>;
  children: React.ReactNode;
}

const AsyncModal: React.FC<AsyncModalProps> = ({
  userId,
  handleAction,
  actionText,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Подтвердите действие");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    handleAction(userId);

    setModalText("Действие выполняется...");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setModalText("Подтвердите действие");
    }, 100);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <span onClick={showModal}>{children}</span>
      <Modal
        title={modalText}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{actionText}</p>
      </Modal>
    </>
  );
};

export default AsyncModal;
