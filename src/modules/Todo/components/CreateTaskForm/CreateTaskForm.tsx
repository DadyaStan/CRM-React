import { useRef, useContext } from "react";
import "./CreateTaskForm.scss";
import { Button } from "antd";
import { createNewTodo } from "../../api/TodoApi";
import { TodoContext } from "../../context";

export const CreateTaskForm = () => {
  const newTask = useRef<HTMLInputElement>(null);
  const { fetchData } = useContext(TodoContext);

  const handleCreateTask = async () => {
    if (newTask.current?.value) {
      try {
        console.log(newTask.current?.value);
        await createNewTodo(newTask.current?.value);
        await fetchData();
      } catch {
        alert("bad");
      } finally {
        newTask.current.value = "";
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
