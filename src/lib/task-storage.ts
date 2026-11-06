import type { Task } from "../types/task";

const STORAGE_KEY = "taskflow.tasks";

export interface TaskStorageResult {
  tasks: Task[];
  error: string | null;
}

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) return false;

  const task = value as Record<string, unknown>;
  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.completed === "boolean" &&
    typeof task.createdAt === "string"
  );
}

export function readTasks(storage: Storage = window.localStorage): TaskStorageResult {
  try {
    const savedTasks = storage.getItem(STORAGE_KEY);
    if (savedTasks === null) return { tasks: [], error: null };

    const parsed: unknown = JSON.parse(savedTasks);
    if (!Array.isArray(parsed) || !parsed.every(isTask)) {
      return {
        tasks: [],
        error: "Saved tasks are invalid. New tasks will be saved after you add one.",
      };
    }

    return { tasks: parsed, error: null };
  } catch {
    return {
      tasks: [],
      error: "Saved tasks could not be read. New tasks will be saved after you add one.",
    };
  }
}

export function writeTasks(
  tasks: Task[],
  storage: Storage = window.localStorage,
): string | null {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return null;
  } catch {
    return "Your changes could not be saved in this browser.";
  }
}
