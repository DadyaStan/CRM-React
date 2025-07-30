import "./TodoList.scss";
import { TodoCard } from "../TodoCard/TodoCard";
import type { TodoItem } from "../../types/Todo";
import { useContext } from "react";
import { TodoContext } from "../../context";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const TodoList = () => {
  const { todos } = useContext(TodoContext);

  if (!todos) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <div className="todo-list">
      {todos?.length ? (
        todos.map((todo: TodoItem) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            isDone={todo.isDone}
            created={""}
          />
        ))
      ) : (
        <div>Задач нет</div>
      )}
    </div>
  );
};
