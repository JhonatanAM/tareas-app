import styles from "./TaskItem.module.css";
import type { Task } from "../../../types";
import { useState } from "react";
import { useTasks } from "../../../Provider/TasksProvider";
import * as TaskService from "../../../services/tasks.service";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface Props {
    task: Task;
}

export default function TaskItem({ task }: Props) {
    const { deleteTask, fetchTasks, toggleComplete } = useTasks();
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
                    <Card >
                        <Card.Body>
                            <Card.Title className={styles.cardTitle}>{task.title}
                                <label>
                                    Completada
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task.id)}
                                    />
                                </label>

                            </Card.Title>
                            <Card.Subtitle>{task.description}</Card.Subtitle>
                            <Card.Text>
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

                            </Card.Text>
                            <div className={styles.actions}>
                                <Button variant="primary" onClick={() => setEditing(true)} disabled={task.completed}> Editar</Button>
                                <Button variant="primary" onClick={() => deleteTask(task.id)} disabled={task.completed}> Eliminar</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    );
}
