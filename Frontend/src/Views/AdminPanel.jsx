import { AuthContext } from "../Utils/AuthContext";
import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function AdminPanel() {
    const { userAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const nav = function (e, place) {
        e.preventDefault();
        return navigate(place);
    };

    useEffect(() => {
        if (!userAuthenticated) {
            navigate("/home");
        }
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div className="container" style={{ marginTop: "10em" }}>
                <div>
                    <h3 className="text-white">Crear elementos</h3>
                    <div className="row">
                        <div className="col-3">
                            <div
                                className="card mt-3 click"
                                style={{ width: "100%" }}
                                onClick={(e) => handleCreateGame(e)}
                            >
                                <div className="card-body">
                                    <i class="bi bi-plus-circle"></i> Añadir juego
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div
                                className="card mt-3 click"
                                style={{ width: "100%" }}
                                onClick={(e) => handleCreateGame(e)}
                            >
                                <div className="card-body">
                                    <i class="bi bi-plus-circle"></i> Añadir empresa
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div
                                className="card mt-3 click"
                                style={{ width: "100%" }}
                                onClick={(e) => handleCreateGame(e)}
                            >
                                <div className="card-body">
                                    <i class="bi bi-plus-circle"></i> Añadir plataforma
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div
                                className="card mt-3 click"
                                style={{ width: "100%" }}
                                onClick={(e) => handleCreateGame(e)}
                            >
                                <div className="card-body">
                                    <i class="bi bi-plus-circle"></i> Añadir protagonista
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-white mt-5">Clientes mas frecuentes</h3>
                </div>
                <div>
                    <h3 className="text-white mt-5">Juegos mas rentados</h3>
                </div>
                <div>
                    <h3 className="text-white mt-5">
                        juego menos rentado por clientes de 10 años en 10 años
                    </h3>
                </div>
                <div>
                    <h3 className="text-white mt-5">
                        Precio de alquileres
                    </h3>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default AdminPanel;
