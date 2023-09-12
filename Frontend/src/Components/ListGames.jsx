import React from "react";
import { useEffect } from "react";

function ListGames({ games, title, type }) {
    return (
        <div className="container" style={{ marginTop: "10em" }}>
            <h1 className="text-white mb-5">
                {type === "platform" ? (
                    <div>{title} games</div>
                ) : type === "name" ? (
                    <div> {title} </div>
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
            ) : (
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
            )}
        </div>
    );
}

export default ListGames;
