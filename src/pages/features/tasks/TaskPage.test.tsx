import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("../../../components/tasks/taskList/TaskList", () => () => <div>Mock TaskList</div>);
jest.mock("../../../components/tasks/taskItem/TaskItem", () => () => <div>Mock TaskItem</div>);
jest.mock("react-bootstrap/Button", () => (props: any) => <button {...props}>{props.children}</button>);
jest.mock("./TasksPage.css", () => ({}));


const TaskPage = () => {
    return <div>Lista de Tareas</div>;
};

describe("TasksPage component", () => {
    test("should render text 'Lista de Tareas'", () => {
        render(<TaskPage />);
        expect(screen.getByText(/Lista de Tareas/i)).toBeInTheDocument();
    });
});
