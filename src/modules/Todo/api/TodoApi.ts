import type {
  TodoItem,
  TodoInfo,
  MetaResponse,
  TodoRequest,
} from "../types/Todo";

export const BASE_URL = "https://easydev.club/api/v2";

export const fetchFilteredTodo = async (
  newFilter: string,
): Promise<MetaResponse<TodoItem, TodoInfo> | undefined> => {
  try {
    const response: Response = await fetch(
      `${BASE_URL}/todos?filter=${newFilter}`,
    );
    const result: MetaResponse<TodoItem, TodoInfo> = await response.json();

    if (!response.ok) {
      throw new Error("Ошибка при загрузки профиля " + Error);
    }

    return result;
  } catch (error) {
    console.error(error);

    throw new Error("Ошибка при загрузки профиля " + Error);
  }
};

export const createNewTodo = async (inputValue: string): Promise<void> => {
  try {
    const response: Response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ isDone: false, title: inputValue }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при создании задачи " + Error);
    }
  } catch (error) {
    console.error(error);

    throw new Error("Ошибка при создании задачи " + Error);
  }
};

export const changeTodo = async (
  taskId: number,
  changedTask: TodoRequest,
): Promise<TodoItem> => {
  try {
    const response: Response = await fetch(`${BASE_URL}/todos/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(changedTask),
    });

    if (!response.ok) {
      throw new Error("Ошибка при изменении задачи " + Error);
    }

    const result: TodoItem = await response.json();
    return result;
  } catch (error) {
    console.error(error);

    throw new Error("Ошибка при изменении задачи " + Error);
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    const response: Response = await fetch(`${BASE_URL}/todos/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка при удалении " + Error);
    }
  } catch (error) {
    console.error(error);

    throw new Error("Ошибка при удалении " + Error);
  }
};
