import axios from "axios";

const API_URL = "http://localhost:5100/tasks";

export const getTasks = () => axios.get(API_URL);
export const addTask = (newTask) => axios.post(API_URL, newTask);
