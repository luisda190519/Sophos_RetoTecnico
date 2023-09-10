import React from "react";

function ListGames({ games, platform }) {
    return (
        <div className="container" style={{ marginTop: "10em" }}>
            <h1 className="text-white mb-5">{platform} games</h1>
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
                        <div
                            className="mt-3"
                            style={{ height: "10%" }}
                        >
                            <div className="d-flex justify-content-between">
                                <p>{game.title || game.Title}</p>
                                <p>{game.price || game.Price}$</p>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default ListGames;
