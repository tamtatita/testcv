import React from "react";
import { Flex, Select } from "antd";

const TaskFilter = ({ filter, onFilterChange }) => {
  const statusFilter = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "completed",
      label: "Completed",
    },
    {
      value: "incomplete",
      label: "Incomplete",
    },
  ];
  return (
    <Flex>
      <Select onChange={onFilterChange} style={{ width: 140 }} value={filter}>
        {statusFilter.map((item) => (
          <Select.Option key={item?.value} value={item?.value}>
            {item?.label}
          </Select.Option>
        ))}
      </Select>
    </Flex>
  );
};

export default TaskFilter;
