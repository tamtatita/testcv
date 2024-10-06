import React from "react";
import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import TaskList from "../pages/TaskPage/TaskList";
import userEvent from "@testing-library/user-event";
const data = [
  { id: "1", title: "Task 1", completed: true },
  {
    id: "2",
    title: "Task non complete",
    completed: false,
  },
];

afterEach(() => {
  cleanup();
});
test("Test task not complete", () => {
  const onToggleComplete = jest.fn();
  render(<TaskList data={data} onToggleComplete={onToggleComplete} />);
  const taskList = screen.getAllByTestId("todo-1");
  expect(taskList[0]).toBeInTheDocument();
  expect(taskList[0]).toHaveTextContent("Task 1");
});
test("Test task not complete", () => {
  const onToggleComplete = jest.fn();
  render(<TaskList data={data} onToggleComplete={onToggleComplete} />);
  const taskList = screen.getAllByTestId("todo-2");
  expect(taskList[0]).toBeInTheDocument();
  expect(taskList[0]).toHaveTextContent("Task non complete");
});
