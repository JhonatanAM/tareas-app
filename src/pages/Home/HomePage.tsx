import style from "../../App.module.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './HomePage.css';

export default function HomePage() {
    const navigate = useNavigate();

    const handleClick = (route: string) => {
        navigate(route);
    };
    return (
        <div className="button-container">
            <h1 className="home-title"> PRUEBA TECNICA KERAUNOS</h1>
            <div className="button-wrapper">
                <Button
                    variant="primary"
                    className={style.button}
                    onClick={() => handleClick("/task-list")}
                    aria-label="Ver tasks"
                >
                    Ver tareas
                </Button>

                <Button
                    variant="secondary"
                    className={style.button}
                    onClick={() => handleClick("/")}
                    aria-label="Ir a taskPage"
                >
                    Simular Api
                </Button>
            </div>
        </div>
    );
}
