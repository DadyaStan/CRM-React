import "./Todo.scss";

import { useState, useEffect } from "react";

import { CreateTaskForm } from "../CreateTaskForm/CreateTaskForm";
import { TodoTabs } from "../TodoTabs/TodoTabs";
import { TodoList } from "../TodoList/TodoList";

import { fetchFilteredTodo } from "../../api/TodoApi";
import { TodoContext } from "../../context";
import { type TodoInfo, type TodoItem, TodoFilter } from "../../types/Todo";

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[] | null>(null);
  const [todosCategory, setTodosCategory] = useState<TodoFilter>(
    TodoFilter.all,
  );
  const [todosInfo, setTodosInfo] = useState<TodoInfo | undefined>(undefined);

  const fetchData = async () => {
    try {
      const response = await fetchFilteredTodo(todosCategory);

      if (response) {
        setTodos(response.data);
        setTodosInfo(response.info);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [todosCategory]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        todosCategory,
        setTodosCategory,
        fetchData,
        todosInfo,
      }}
    >
      <div className="todo-container">
        <CreateTaskForm />
        <TodoTabs />
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
};
