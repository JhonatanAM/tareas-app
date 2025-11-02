import TaskList from "../../../components/tasks/taskList/TaskList";
import './TasksPage.css';

export default function TasksPage() {
    return (
        <div className="tasks-container">
            <h1 className="tasks-title">Lista de Tareas</h1>
            <TaskList />
        </div>
    );
}
