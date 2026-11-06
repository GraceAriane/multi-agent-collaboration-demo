import type { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
      <input
        aria-label={`Mark "${task.title}" as ${task.completed ? "active" : "completed"}`}
        checked={task.completed}
        className="size-5 shrink-0 cursor-pointer accent-indigo-600"
        onChange={() => onToggle(task.id)}
        type="checkbox"
      />
      <span
        className={`min-w-0 flex-1 break-words text-sm ${
          task.completed ? "text-slate-400 line-through" : "text-slate-700"
        }`}
      >
        {task.title}
      </span>
      <button
        aria-label={`Delete "${task.title}"`}
        className="rounded-lg px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
        onClick={() => onDelete(task.id)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
}
