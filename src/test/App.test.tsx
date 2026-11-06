import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("TaskFlow", () => {
  it("creates tasks, changes status, filters, deletes, and persists them", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.type(screen.getByRole("textbox", { name: "New task" }), "Write project brief");
    await user.click(screen.getByRole("button", { name: "Add task" }));
    expect(screen.getByText("Write project brief")).toBeInTheDocument();
    expect(localStorage.getItem("taskflow.tasks")).toContain("Write project brief");

    await user.click(screen.getByRole("checkbox", { name: 'Mark "Write project brief" as completed' }));
    expect(screen.getByText("0 tasks left")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Active" }));
    expect(screen.getByText("Nothing on this list yet")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Completed" }));
    expect(screen.getByText("Write project brief")).toBeInTheDocument();

    unmount();
    render(<App />);
    expect(screen.getByText("Write project brief")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: 'Delete "Write project brief"' }));
    expect(screen.getByText("Nothing on this list yet")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("taskflow.tasks") ?? "[]")).toHaveLength(0);
  });

  it("does not create empty tasks and reports invalid saved data", async () => {
    const user = userEvent.setup();
    localStorage.setItem("taskflow.tasks", "not-json");

    render(<App />);
    expect(screen.getByRole("alert")).toHaveTextContent("Saved tasks could not be read");
    expect(screen.getByRole("button", { name: "Add task" })).toBeDisabled();

    await user.type(screen.getByRole("textbox", { name: "New task" }), "   ");
    expect(screen.getByRole("button", { name: "Add task" })).toBeDisabled();
    expect(within(screen.getByRole("region", { name: "Task manager" })).getByText("Nothing on this list yet")).toBeInTheDocument();
  });
});
