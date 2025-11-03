import axios from "axios";
import type { Task } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const getTasks = () => {
    return axios.get<Task[]>(`${API_URL}/tasks`);
};


export const getTask = (id: number) => {
    return axios.get<Task>(`${API_URL}/tasks/${id}`);
};

export const createTask = (task: Omit<Task, "id">) => {
    return axios.post<Task>(`${API_URL}/tasks`, task);
};

export const updateTask = (id: number, updates: Partial<Task>) => {
    return axios.patch<Task>(`${API_URL}/tasks/${id}`, updates);
};

export const deleteTask = (id: number) => {
    return axios.delete(`${API_URL}/tasks/${id}`);
};
