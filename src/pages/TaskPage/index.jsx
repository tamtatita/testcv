import React from "react";
import { Button, message, Modal } from "antd";
import TaskForm from "./TaskForm";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getTasks, addTask } from "../../api/tasksApi";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";

const TaskPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getTasks();

      if (response.status === 200) {
        setTasks(response.data);
      } else {
        message.error("An error has occurred");
      }
    };
    fetchAPI();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  // Hàm thêm Task
  const handleAddTask = useCallback(
    (title) => {
      const newTask = { title, completed: false };
      addTask(newTask).then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
      });
      message.success("Task added successfully");
    },
    [addTask, setTasks]
  );

  // Hàm check đã completed
  const handleToggleComplete = useCallback(
    (taskId) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  const handleOpenModal = useCallback(() => {
    setOpenModal((prevOpenModal) => !prevOpenModal);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="h-[80%] w-1/2 bg-slate-50 shadow-md shadow-slate-200 p-4 rounded-md">
        <h1 className="font-bold text-slate-800 text-xl text-center my-3">
          Todo Lists App
        </h1>

        {/* Nút thêm Task */}
        <div className="flex items-center justify-between">
          <TaskFilter filter={filter} onFilterChange={setFilter} />
          <Button
            onClick={handleOpenModal}
            icon={<PlusOutlined />}
            type="primary"
          >
            Add Task
          </Button>
        </div>

        {/* Hiện Các Tasks */}
        <div className="">
          <TaskList
            onToggleComplete={handleToggleComplete}
            data={filteredTasks}
          />
        </div>
      </div>

      {/* Modal hiện form tạo Task */}
      <Modal
        title="Add New Task"
        open={openModal}
        onCancel={handleOpenModal}
        footer={false}
      >
        <TaskForm onAddTask={handleAddTask} />
      </Modal>
    </div>
  );
};

export default TaskPage;
