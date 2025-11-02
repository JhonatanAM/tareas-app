import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from "./TaskItem.module.css";
import type { Task } from "../../../types";
import { useState } from "react";
import { useTasks } from "../../../Provider/TasksProvider";
import * as TaskService from "../../../services/tasks.service";
import Card from 'react-bootstrap/Card';
import { useForm } from "react-hook-form";

interface Props {
    task: Task;
}

export default function TaskItem({ task }: Props) {
    const { deleteTask, fetchTasks, toggleComplete } = useTasks();
    const [editing, setEditing] = useState(false);

    const lastStatus = task.history.at(-1)?.status || task.status;

    const handleSave = async (data: Task) => {
        console.log(data);

        await TaskService.updateTask(task.id, data);
        setEditing(false);
        fetchTasks();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Task>({
        defaultValues: task || {
            title: "",
            description: "",
            dueDate: "",
            status: "pending",
            notes: [""],
            completed: false,
        },
    });

    return (
        <div className={`${styles.card} ${task.completed ? styles.completed : ""}`}>
            <>
                <Card >
                    <Card.Body>
                        <Card.Title className={styles.cardTitle}>Tarea #{task.id} {task.title} - Estado: {lastStatus}
                            {!editing ? <>
                                <Button variant="primary" onClick={() => setEditing(true)} disabled={task.completed}> Editar</Button>
                            </> : <></>}
                        </Card.Title>


                        <form onSubmit={handleSubmit(handleSave)} className={`${styles.taskForm} ${!editing ? styles.hideDetails : styles.showDetails}`}>
                            <label>
                                Completada
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleComplete(task.id)}
                                />
                            </label>
                            <div className="row">
                                <div className="row w-50">
                                    <Form.Group className={styles.formGroup}>
                                        <Form.Label>Título</Form.Label>
                                        <Form.Control className={styles.formControl}
                                            {...register("title", { required: "El título es obligatorio" })}
                                            disabled={!editing}
                                        />
                                        {errors.title && <p className="error">{errors.title.message}</p>}
                                    </Form.Group>

                                    <Form.Group className={styles.formGroup}>
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control className={styles.formControl} as="textarea" {...register("description")} disabled={!editing} />
                                    </Form.Group >
                                </div>
                                <div className="row w-50">
                                    <Form.Group className={styles.formGroup}>
                                        <Form.Label>Fecha de vencimiento</Form.Label>
                                        <Form.Control className={styles.formControl} type="date" {...register("dueDate")} disabled={!editing} />
                                    </Form.Group >

                                    <Form.Group className={styles.formGroup}>
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Select className={styles.formSelect} {...register("status")} disabled={!editing}>
                                            <option value="pending">Pendiente</option>
                                            <option value="in-progress">En progreso</option>
                                            <option value="completed">Completada</option>
                                        </Form.Select>
                                    </Form.Group >
                                </div>
                            </div>

                            <div>
                                {task.notes.length > 0 && (
                                    <div className={styles.notes}>
                                        <strong>Notas:</strong>
                                        <ListGroup as="ul">
                                            {task.notes.map((note) => (
                                                <ListGroup.Item as="li" key={note.id} >
                                                    {note.text}
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </div>
                                )}

                                <div className={styles.actions}>
                                    {editing ? (
                                        <button className="btn btn-primary" type="submit">Guardar</button>
                                    ) : (
                                        <Button variant="primary" onClick={() => setEditing(true)} disabled={task.completed}> Editar</Button>
                                    )}
                                    <Button
                                        variant="primary"
                                        onClick={() => !editing ?
                                            deleteTask(task.id) :
                                            setEditing(false)}
                                        disabled={task.completed}> {editing ? 'Cancelar' : 'Eliminar'}</Button>
                                </div>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </>
        </div >
    );
}
