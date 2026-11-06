import { useCallback, useState } from "react";
import { readTasks, writeTasks } from "../lib/task-storage";
import type { Task } from "../types/task";

function createTask(title: string): Task {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function useTasks() {
  const [initialState] = useState(readTasks);
  const [tasks, setTasks] = useState<Task[]>(initialState.tasks);
  const [storageError, setStorageError] = useState<string | null>(initialState.error);

  const save = useCallback((nextTasks: Task[]) => {
    setTasks(nextTasks);
    setStorageError(writeTasks(nextTasks));
  }, []);

  const addTask = useCallback(
    (title: string) => {
      const trimmedTitle = title.trim();
      if (!trimmedTitle) return;

      save([createTask(trimmedTitle), ...tasks]);
    },
    [save, tasks],
  );

  const toggleTask = useCallback(
    (id: string) => {
      save(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    },
    [save, tasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      save(tasks.filter((task) => task.id !== id));
    },
    [save, tasks],
  );

  return { tasks, storageError, addTask, toggleTask, deleteTask };
}
