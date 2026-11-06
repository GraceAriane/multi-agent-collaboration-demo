import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center">
        <p className="text-sm font-medium text-slate-600">Nothing on this list yet</p>
        <p className="mt-1 text-sm text-slate-400">Add a task above and take it one step at a time.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
