import { useState, useEffect, useRef, useContext } from "react";
import type { TodoItem } from "../../types/Todo";
import "./TodoCard.scss";
import { Checkbox, Button } from "antd";
import { changeTodo, deleteTask } from "../../api/TodoApi";
import { TodoContext } from "../../context";

import IconAccept from "@assets/IconAccept.svg";
import IconBack from "@assets/IconBack.svg";
import IconRewrite from "@assets/IconRewrite.svg";
import IconDelete from "@assets/IconDelete.svg";

export const TodoCard = (props: TodoItem) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDone, setIsDone] = useState(props.isDone);
  const { fetchData } = useContext(TodoContext);

  const changedTodo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && changedTodo.current) {
      changedTodo.current.value = props.title;
    }
  }, [isEdit]);

  const handleChangeTaskStatus = async (newStatus: boolean) => {
    setIsDone(newStatus);
    console.log(newStatus);
    try {
      await changeTodo(props.id, { isDone: newStatus });
      await fetchData();
    } catch {
      alert("hueta");
    }
  };

  const handleChangeTaskTitle = async () => {
    if (changedTodo.current?.value !== props.title) {
      try {
        await changeTodo(props.id, { title: changedTodo.current?.value });
        await fetchData();
      } catch {
        alert("hueta");
      }
    }
    setIsEdit(false);
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(props.id);
      await fetchData();
    } catch {
      alert("hueta");
    }
  };

  return (
    <div className={isDone ? "todo-card completed-task" : "todo-card"}>
      <div className="todo-card__inner-box">
        <Checkbox
          checked={isDone}
          onChange={(e) => handleChangeTaskStatus(e.target.checked)}
        />
        {isEdit ? (
          <input ref={changedTodo} className="todo-card__input" />
        ) : (
          <p className="todo-card__content">{props.title}</p>
        )}
      </div>
      <div className="todo-card__inner-box">
        {isEdit ? (
          <>
            <Button
              onClick={handleChangeTaskTitle}
              color="cyan"
              variant="solid"
            >
              <img src={IconAccept} alt="Accept" />
            </Button>
            <Button
              onClick={() => setIsEdit(false)}
              color="primary"
              variant="solid"
            >
              <img src={IconBack} alt="Back" />
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => setIsEdit(true)}
              color="primary"
              variant="solid"
            >
              <img src={IconRewrite} alt="Rewrite" />
            </Button>
            <Button onClick={handleDeleteTask} color="danger" variant="solid">
              <img src={IconDelete} alt="Delete" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
