import { useTasks } from "../../Provider/TasksProvider";
import TaskItem from "../taskItem/TaskItem";
import styles from "./TaskList.module.css";

export default function TaskList() {
    const { tasks, totalPages, page, fetchTasks, toggleComplete } = useTasks();

    return (
        <div className={styles.container}>
            {tasks.map((task) => (
                <div key={task.id}>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task.id)}
                        />
                        Completada
                    </label>
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
