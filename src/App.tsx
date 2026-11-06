import { useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";
import type { TaskFilter } from "./types/task";

const filters: { label: string; value: TaskFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function App() {
  const { tasks, storageError, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilter>("all");
  const remainingCount = tasks.filter((task) => !task.completed).length;
  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
      }),
    [filter, tasks],
  );

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-9">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-700">
            <span aria-hidden="true" className="size-2 rounded-full bg-indigo-500" />
            YOUR PERSONAL TASK SPACE
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Make room for
            <br />
            <span className="text-indigo-600">what matters.</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-500">
            A little clarity goes a long way. Capture your next steps and focus on one thing at a time.
          </p>
        </header>

        <section
          aria-label="Task manager"
          className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 shadow-xl shadow-slate-200/50 sm:p-7"
        >
          <TaskForm onAdd={addTask} />

          {storageError && (
            <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800" role="alert">
              {storageError}
            </p>
          )}

          <div className="mb-4 mt-8 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-800">Your tasks</h2>
              <p className="mt-0.5 text-xs text-slate-500" aria-live="polite">
                {remainingCount} {remainingCount === 1 ? "task" : "tasks"} left
              </p>
            </div>
            <div className="flex rounded-xl bg-white p-1 shadow-sm" aria-label="Filter tasks">
              {filters.map(({ label, value }) => (
                <button
                  aria-pressed={filter === value}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    filter === value
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  key={value}
                  onClick={() => setFilter(value)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
        </section>

        <p className="mt-6 text-center text-xs text-slate-400">
          Your tasks stay saved in this browser.
        </p>
      </div>
    </main>
  );
}
