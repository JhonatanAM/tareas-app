import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TasksPage from "../pages/features/tasks/TasksPage";
import HomePage from "../pages/Home/HomePage";
import { ApiPage } from "../pages/features/api/ApiPage";
export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/task-list" element={<TasksPage />} />
                <Route path="/api" element={<ApiPage />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
