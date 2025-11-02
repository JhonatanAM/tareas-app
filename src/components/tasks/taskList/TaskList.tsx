import { useTasks } from "../../../Provider/TasksProvider";
import TaskItem from "../taskItem/TaskItem";
import styles from "./TaskList.module.css";
import Pagination from 'react-bootstrap/Pagination';

export default function TaskList() {
    const { tasks, totalPages, currentPage, fetchTasks } = useTasks();
    console.log((currentPage * 5) - 1);

    return (
        <div className={styles.container}>
            {tasks
                .slice((currentPage - 1) * 5, currentPage * 5)
                .map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}

            <Pagination size="sm" className={styles.pagination}>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => fetchTasks(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div >
    );
}
