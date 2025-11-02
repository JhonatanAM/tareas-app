import { useTasks } from "../../../Provider/TasksProvider";
import TaskItem from "../taskItem/TaskItem";
import styles from "./TaskList.module.css";

export default function TaskList() {
    const { tasks, totalPages, page, fetchTasks } = useTasks();

    return (
        <div className={styles.container}>
            {tasks.map((task) => (
                <div key={task.id}>
                    <TaskItem task={task} />
                </div>
            ))}

            <div className={styles.pagination}>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        className={page === i + 1 ? styles.active : ""}
                        onClick={() => fetchTasks(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
