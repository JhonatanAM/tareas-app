import style from "../../App.module.css";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link
                        className={style.button}
                        to="/task-list"
                        aria-label="Ver tasks"
                    >
                        Ver tareas
                    </Link>

                    <Link
                        className={style.button}
                        to="/"
                        aria-label="Ir a taskPage"
                    >
                        Simular Api
                    </Link>
                </div>
            </div>
        </>
    );
}
