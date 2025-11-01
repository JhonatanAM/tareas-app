import styles from "./TaskItem.module.css";
import type { Task } from "../../types";
import { useState } from "react";
import { useTasks } from "../../Provider/TasksProvider";
import * as TaskService from "../../services/tasks.service";

interface Props {
    task: Task;
}

export default function TaskItem({ task }: Props) {
    const { deleteTask, fetchTasks } = useTasks();
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const lastStatus = task.history.at(-1)?.status || task.status;

    const handleSave = async () => {
        await TaskService.updateTask(task.id, { title, description });
        setEditing(false);
        fetchTasks();
    };

    return (
        <div className={`${styles.card} ${task.completed ? styles.completed : ""}`}>
            {editing ? (
                <>
                    <input
                        className={styles.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={() => setEditing(false)}>Cancelar</button>
                </>
            ) : (
                <>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>
                        <strong>Fecha límite:</strong>{" "}
                        {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Estado actual:</strong> {lastStatus}
                    </p>

                    {task.notes.length > 0 && (
                        <div className={styles.notes}>
                            <strong>Notas:</strong>
                            <ul>
                                {task.notes.map((note) => (
                                    <li key={note.id}>{note.text}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className={styles.actions}>
                        <button onClick={() => setEditing(true)}>Editar</button>
                        <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                    </div>
                </>
            )}
        </div>
    );
}
