# Multi-Agent Collaboration Demo

A small project exploring AI coding agent
collaboration using Concord MCP.

## Objectives

- Understand multi-agent development workflows.
- Coordinate tasks between coding agents.
- Prevent overlapping file modifications.
- Experiment with task handoffs.
- Document the collaboration process.

### Agents

Two AI coding agents were integrated into the same Concord workspace:

- **GitHub Copilot CLI** – Used to create and assign tasks.
- **Goose** – Used to claim assigned tasks, analyze the project,
  and report findings.

### Collaboration Workflow

The experiment validated the following workflow:

1. Copilot created a task and assigned it to Goose through Concord.
2. Goose claimed the task using `start_work`.
3. Goose analyzed the TaskFlow project and identified three
   potential improvements.
4. Goose submitted its findings and completed the task using
   `finish_work`.
5. Copilot retrieved the completed task and reviewed Goose's findings.

### What I Learned

This experiment helped me understand how Concord MCP facilitates:

- Shared workspace coordination.
- Task assignment and ownership.
- Work handoffs between AI agents.
- Progress tracking and task completion.
- Collaboration between different AI coding agents.

No project files were modified during the collaboration experiment.

### Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Concord MCP
- GitHub Copilot CLI
- Goose