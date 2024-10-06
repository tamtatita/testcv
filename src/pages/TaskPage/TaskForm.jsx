import React from "react";
import { Button, Form, Input, Space, Typography } from "antd";
const TaskForm = ({ onAddTask }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    onAddTask(values.task);
    onResetForm();
  };

  const onResetForm = () => {
    form.resetFields();
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <Space className="my-3 w-full" direction="vertical">
        <Typography className="font-semibold text-sm text-slate-700">
          Task Name
        </Typography>
        <Form.Item
          name="task"
          rules={[
            {
              required: true,
              message: "Please input a task",
            },
            {
              validator: (_, value) => {
                if (!value || value.trim() === "") {
                  return Promise.reject(
                    new Error("Task cannot be only spaces")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Space>

      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
