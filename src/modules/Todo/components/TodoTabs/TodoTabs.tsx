import "./TodoTabs.scss";

import React, { useContext } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { TodoContext } from "../../context";
import { TodoFilter } from "../../types/Todo";

// onclick отрабатывает реквест НАРУЖУ
export const TodoTabs: React.FC = () => {
  const { setTodosCategory, todosInfo } = useContext(TodoContext);
  console.log(todosInfo);
  const items: TabsProps["items"] = [
    {
      key: TodoFilter.all,
      label: `Все (${todosInfo?.all || "-"})`,
    },
    {
      key: TodoFilter.inWork,
      label: `В работе (${todosInfo?.inWork || "-"})`,
    },
    {
      key: TodoFilter.completed,
      label: `Сделано (${todosInfo?.completed || "-"})`,
    },
  ];

  const onChange = (key: string) => {
    setTodosCategory(key);
  };

  return (
    <div className="todo-tabs-box">
      <Tabs
        size="large"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};
