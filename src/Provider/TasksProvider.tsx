import { createContext, useContext, useEffect, useState } from "react";
import type { Task } from "../types";
import * as TaskService from "../services/tasks.service";

interface TasksContextProps {
    tasks: Task[];
    totalPages: number;
    currentPage: number;
    fetchTasks: (page?: number) => Promise<void>;
    toggleComplete: (id: number) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

const TasksContext = createContext<TasksContextProps>({} as TasksContextProps);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTasks = async (pageNum = 1) => {
        try {
            const res = await TaskService.getTasks();
            setTasks(res.data);
            console.log(res.data);

            setTotalPages(Math.ceil(res.data.length / 5));
            setCurrentPage(pageNum);
        } finally {

        }
    };

    const toggleComplete = async (id: number) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;
        await TaskService.updateTask(id, { completed: !task.completed });
        await fetchTasks(currentPage);
    };

    const deleteTask = async (id: number) => {
        await TaskService.deleteTask(id);
        await fetchTasks(currentPage);
    };

    useEffect(() => {
        fetchTasks(1);
    }, []);

    return (
        <TasksContext.Provider
            value={{ tasks, totalPages, currentPage, fetchTasks, toggleComplete, deleteTask }}
        >
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext);
