import { useRef } from "react";
import { useTasks } from "../../../Provider/TasksProvider";
import TaskItem from "../taskItem/TaskItem";
import styles from "./TaskList.module.css";
import Pagination from 'react-bootstrap/Pagination';

export default function TaskList() {
    const tasksRef = useRef<HTMLDivElement>(null);
    const { tasks, totalPages, currentPage, fetchTasks } = useTasks();

    return (
        <div >
            <div className={styles.container} ref={tasksRef}>
                {tasks
                    .slice((currentPage - 1) * 5, currentPage * 5)
                    .map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            reference={tasksRef.current} />
                    ))}
            </div>

            {
                tasks.length > 5 && <Pagination size="sm" className={styles.pagination}>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index == currentPage - 1}
                            onClick={() => fetchTasks(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            }
        </div >
    );
}
