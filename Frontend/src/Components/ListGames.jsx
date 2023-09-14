import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListGames({ games, title, type }) {
    const navigate = useNavigate();
    const [typeSearch, setTypeSearch] = useState(type);
    const [search, setSearch] = useState("");

    const handleGameClick = (e, id) => {
        e.preventDefault();
        return navigate("/game/" + id);
    };

    const handleSelect = function (e, type) {
        e.preventDefault();
        setTypeSearch(e.target.value);
    };

    const handleInputChange = function (e) {
        setSearch(e.target.value);
    };

    const handleSearchAdvance = function (e) {
        e.preventDefault();
        return navigate("/game/" + typeSearch + "/" + search);
    };

    return (
        <div className="container" style={{ marginTop: "10em" }}>
            <h1 className="text-white mb-5">
                {type === "platform" ? (
                    <div>{title} games</div>
                ) : type === "name" ? (
                    <div> {title} </div>
                ) : type === "director" || type === "producer" ? (
                    <div>
                        Juegos{" "}
                        {type === "director" ? "dirigidos" : "producidos"} por{" "}
                        {title}
                    </div>
                ) : type === "brand" ? (
                    <div>Juegos hecho por la empresa {title} </div>
                ) : type === "year" ? (
                    <div>Juegos lanzados en el año {title}</div>
                ) : type === "mc" ? (
                    <div>Juegos con el/la Protagonista llamado {title}</div>
                ) : (
                    <div></div>
                )}
            </h1>
            {games === "cargando" ? (
                <div></div>
            ) : games === false ? (
                <div className="mt-4 fs-1 card text-bg-danger mb-3">
                    <div className="row">
                        <div className="col-10">
                            <i className="bi bi-eye-slash py-3 px-3">
                                {" "}
                                Juego/s no se encontrados
                            </i>
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                            <i className="bi bi-x-lg"></i>
                        </div>
                    </div>
                </div>
            ) : games !== "advance" ? (
                <div className="row">
                    {games.map((game, key) => (
                        <div className="col-4 mt-3" key={key}>
                            <div
                                className="card click"
                                style={{
                                    height: "100%",
                                    border: "0",
                                    backgroundColor: "#272727",
                                    color: "white",
                                }}
                                onClick={(e) => handleGameClick(e, game.gameID)}
                            >
                                <img
                                    src={game.imageUrl || game.ImageUrl}
                                    alt=""
                                    className="card-img-top img-fluid"
                                    style={{
                                        height: "15em",
                                        width: "100%",
                                    }}
                                />
                                <div className="mt-3" style={{ height: "10%" }}>
                                    <div className="d-flex justify-content-between">
                                        <p>{game.title || game.Title}</p>
                                        <p>{game.price || game.Price}$</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <div className="row">
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-contro w-100 py-2 mt-1 text-white"
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Digite un valor a buscar"
                            />
                        </div>
                        <div className="col-6 py-2">
                            <div className="input-group">
                                <select
                                    className="form-select text-white"
                                    id="inputGroupSelect04"
                                    aria-label="Example select with button addon"
                                    onChange={(e) => handleSelect(e)}
                                >
                                    <option value="platform">Plataforma</option>
                                    <option value="name">Nombre</option>
                                    <option value="director">Director</option>
                                    <option value="producer">Productor</option>
                                    <option value="brand">Marca</option>
                                    <option value="year">
                                        Año de lanzamiento
                                    </option>
                                    <option value="mc">Protagonista/s</option>
                                </select>
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    id="naranja"
                                    onClick={(e) => handleSearchAdvance(e)}
                                >
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListGames;
