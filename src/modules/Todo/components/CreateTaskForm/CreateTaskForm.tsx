import { useRef, useContext } from "react";
import "./CreateTaskForm.scss";
import { Button, message } from "antd";
import { createNewTodo } from "../../api/TodoApi";
import { TodoContext } from "../../context";
import isTaskCorrected from "../../helpers/isTaskCorrected";

export const CreateTaskForm = () => {
  const { fetchData } = useContext(TodoContext);
  const newTask = useRef<HTMLInputElement>(null);

  const handleCreateTask = async () => {
    if (newTask.current?.value) {
      if (isTaskCorrected(newTask.current?.value)) {
        try {
          console.log(newTask.current?.value);
          await createNewTodo(newTask.current?.value);
          await fetchData();
        } catch {
          message.error("Ошибка при создании задачи");
        } finally {
          newTask.current.value = "";
        }
      } else {
        message.warning("Задача может содержать от 2 до 64 символов");
      }
    }
  };

  return (
    <div className="create-task-form">
      <input
        ref={newTask}
        className="create-task-form__input"
        type="text"
        placeholder="Новая задача..."
      />
      <Button onClick={handleCreateTask} type="primary">
        Создать
      </Button>
    </div>
  );
};
