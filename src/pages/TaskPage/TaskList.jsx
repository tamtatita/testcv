import React from "react";
import { Checkbox, Empty } from "antd";
import { memo } from "react";

const TaskList = ({ data, onToggleComplete }) => {
  return (
    <div>
      {data?.length > 0 ? (
        data?.map((task) => (
          <div data-testid={`todo-${task?.id}`} key={task?.id}>
            <Checkbox
              // data-testid="task-checkbox"

              onChange={() => onToggleComplete(task?.id)}
              className="flex my-3"
              checked={task?.completed}
            >
              <span className={`${task?.completed && "line-through"}`}>
                {task?.title}
              </span>
            </Checkbox>
          </div>
        ))
      ) : (
        <Empty description="No Task" />
      )}
    </div>
  );
};

export default memo(TaskList);
