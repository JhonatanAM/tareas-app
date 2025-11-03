import { Button } from "react-bootstrap";
import style from "../../../App.module.css";
import "./ApiPage.css";
import { useCatApi } from "../../../Provider/ApiProvider";


export const ApiPage = () => {
    const { cat, loading, error, fetchCat } = useCatApi();

    return (
        <div>
            <div className="apiCallMainContainer">
                <div className="apiHeader">
                    <h1 className="tasks-title">Simulación de llamada a API</h1>
                    <Button
                        className={style.button}
                        onClick={fetchCat}
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Hacer llamada a API"}
                    </Button>
                </div>
                <div className="apiResponseContainer">
                    <h2 className="tasks-title">Respuesta de la API:</h2>
                    {error && <p style={{ color: "red" }}>Error: {error}</p>}

                    {cat ? (
                        <div style={{ marginTop: 12 }}>
                            <img
                                src={cat.url}
                                alt={cat.id}
                                style={{ maxWidth: "100%", borderRadius: 8 }}
                            />
                            {cat.breeds && cat.breeds.length > 0 && (
                                <p style={{ marginTop: 8 }}>Raza: {cat.breeds[0].name}</p>
                            )}
                        </div>
                    ) : (
                        !loading && (
                            <h6 className="tasks-title">No hay gato cargado aún.</h6>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
