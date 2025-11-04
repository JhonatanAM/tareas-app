import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from "./TaskItem.module.css";
import type { Note, Task } from "../../../types";
import { useEffect, useState } from "react";
import { useTasks } from "../../../Provider/TasksProvider";
import * as TaskService from "../../../services/tasks.service";
import Card from 'react-bootstrap/Card';
import { set, useForm } from "react-hook-form";

interface Props {
    task: Task;
    reference?: HTMLDivElement | null;
    isCreation?: boolean;
    actionFn?: () => void
}

export default function TaskItem({ task, reference, isCreation, actionFn }: Props) {
    const { deleteTask, fetchTasks, toggleComplete } = useTasks();
    const [isNewTask] = useState<boolean>(isCreation ?? false);
    const [editing, setEditing] = useState<boolean>(false);
    const [addNote, setAddNote] = useState<boolean>(false);
    const [notes, setNotes] = useState<Note[]>(task.notes || []);

    /*
        @handleSave
        @params<data>
        Allows manage the behavior save button
    */
    const handleSave = async (data: Task) => {
        data.notes = notes;
        if (isNewTask) {
            await TaskService.createTask(data);
            actionFn?.();
        } else {
            await TaskService.updateTask(task.id, data);
        }
        setEditing(false);
        setAddNote(false);
        setNotes(data.notes || []);
        fetchTasks();
    };

    /*
       @handleAddNote
   */
    const handleAddNote = () => {
        setNotes([...notes, { id: Date.now().toString(), text: "" }]);
    }

    /*
        @handleEditButton
    */
    const handleEditButton = () => {
        setEditing(true)
    }

    /*
       @handleCancel
   */
    const handleCancel = () => {
        if (isNewTask) {
            actionFn?.();
            return;
        }
        setEditing(false);
        setAddNote(false);
        setNotes(task.notes || []);
    }

    /*
       @handleDelete
   */
    const handleDelete = () =>
        deleteTask(task.id);


    const handleAddNoteButton = () => { handleAddNote(); setAddNote(true); }

    const handleToggleComplete = () => {
        toggleComplete(task.id);
        task.status = "completed";
        handleSave(task);
        setEditing(false)
    };

    useEffect(() => {
        const containerElem = reference;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }

        if (isCreation) {
            setEditing(isCreation ?? false);

        }
    }, [editing]);


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
                        {!isCreation &&
                            <Card.Title className={styles.cardTitle}>
                                <p className={styles.cardStatus}>
                                    Tarea {task.title} - Estado: {task.status}
                                </p>
                                {!editing ? <>
                                    <Button
                                        variant="primary"
                                        onClick={() => setEditing(true)}
                                        disabled={task.completed}> Editar</Button>
                                    <Button
                                        className='ms-2'
                                        variant="danger"
                                        onClick={handleDelete}
                                    >Eliminar</Button>
                                </> : <>
                                    <Button
                                        variant="danger"
                                        onClick={handleDelete}
                                    >Eliminar</Button></>}
                            </Card.Title>
                        }


                        <form onSubmit={handleSubmit(handleSave)} className={`${styles.taskForm} ${!editing ? styles.hideDetails : styles.showDetails}`}>
                            {!isCreation &&
                                <label>
                                    Completada
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={handleToggleComplete}
                                    />
                                </label>
                            }
                            <div className="row">
                                <div className="row w-50">
                                    <Form.Group className={styles.formGroup}>
                                        <Form.Label>Título</Form.Label>
                                        <div className="d-flex flex-column">
                                            <Form.Control className={`${styles.formControl} flex-grow-1 w-100`}
                                                {...register("title", { required: "El título es obligatorio" })}
                                                disabled={!editing}
                                            />
                                            {errors.title && <p className={`${styles.error}`}>{errors.title.message}</p>}
                                        </div>
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
                                <strong>Notas:</strong>
                                <Button variant="link" onClick={handleAddNoteButton}> Agregar</Button>
                                {notes.length > 0 && (
                                    <div className={styles.notes}>
                                        <ListGroup as="ul" className={styles.ulContainer}>
                                            {notes.map((nota, index) => (
                                                <div key={nota.id} >
                                                    {
                                                        addNote ?
                                                            <Form.Group >
                                                                <Form.Control
                                                                    className='m-1'
                                                                    type="text"
                                                                    defaultValue={nota?.text ?? nota}
                                                                    {...register(`notes.${index}.text`, {
                                                                        required: "El campo es requerido", onChange: (e) => {
                                                                            nota.text = e.target.value;
                                                                        }
                                                                    })}
                                                                />
                                                                {errors.notes && <p className={`${styles.error}`}>{errors.notes.message}</p>}
                                                            </Form.Group >
                                                            :
                                                            <span>{nota?.text ?? nota}</span>
                                                    }
                                                </div>
                                            ))}
                                        </ListGroup>
                                    </div>
                                )}

                                <div className={styles.actions}>
                                    {editing ? (
                                        <button className="btn btn-primary" type="submit">Guardar</button>
                                    ) : (
                                        <Button variant="primary" onClick={handleEditButton} disabled={task.completed}> Editar</Button>
                                    )}
                                    <Button
                                        variant="primary"
                                        onClick={handleCancel}
                                        disabled={task.completed}> Cancelar</Button>
                                </div>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </>
        </div >
    );
}
