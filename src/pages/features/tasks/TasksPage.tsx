import TaskList from "../../../components/tasks/taskList/TaskList";
import Button from 'react-bootstrap/Button';
import './TasksPage.css';
import { useState } from "react";
import TaskItem from "../../../components/tasks/taskItem/TaskItem";

export default function TasksPage() {
    const [createTask, setCreateTask] = useState(false);

    const handleActionBack = () => {
        setCreateTask(false);
    }
    return (
        <div className="tasks-container">
            <h1 className="tasks-title">Lista de Tareas</h1>
            <div className="column d-flex align-items-start gap-2">
                {
                    createTask ? <>
                        <TaskItem task={{
                            id: 0,
                            title: "",
                            description: "",
                            dueDate: "",
                            status: "",
                            notes: [],
                            history: [],
                            completed: false
                        }} isCreation={true} actionFn={handleActionBack} />
                    </> : <>
                        <TaskList />
                    </>
                }

                <Button variant="primary" onClick={() => setCreateTask(true)}> Crear tarea</Button>
            </div>
        </div>
    );
}
