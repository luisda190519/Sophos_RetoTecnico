import React, { useEffect, useState } from "react";
import { getRequest } from "../Utils/Request";
import { useNavigate, useParams } from "react-router-dom";

function GameSets({ title, type }) {
    const [data, setData] = useState([]);
    const [expand, setExpand] = useState(false);
    const [expandText, setExpandText] = useState("Ver todo");
    const navigate = useNavigate();

    const handleExpandClick = (e) => {
        e.preventDefault();
        setExpand(!expand);
        setExpandText(expandText == "Ver todo" ? "Ver menos" : "Ver todo");
    };

    const handleGameClick = (e, id) => {
        e.preventDefault();
        console.log(id);
        return navigate("/game/" + id);
    };

    useEffect(() => {
        getRequest(type)
            .then((response) => {
                const dataArray = normalizeData(response);
                setData(dataArray);
                console.log(type);
                console.log(dataArray);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [type]);

    const normalizeData = (response) => {
        if (Array.isArray(response)) {
            return response;
        } else if (response["$values"]) {
            return response["$values"];
        } else {
            return [];
        }
    };

    return (
        <div>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col d-flex justify-content-start">
                        <h2 className="text-white">{title}</h2>;
                    </div>
                    <div className="col d-flex justify-content-end">
                        <button
                            className={
                                expand ? "btn btn-danger" : "btn btn-secondary"
                            }
                            onClick={e => handleExpandClick(e)}
                        >
                            {expandText}
                        </button>
                    </div>
                </div>
                <div className="">
                    {expand ? (
                        <div className="row mt-4 mb-3">
                            {data.map((game, key) => {
                                return (
                                    <div className="col-4 mt-3" key={key}>
                                        <div
                                            className="card click"
                                            style={{
                                                height: "100%",
                                                border: "0",
                                                backgroundColor: "#272727",
                                                color: "white",
                                            }}
                                            onClick={(e) =>
                                                handleGameClick(e, game.gameID)
                                            }
                                        >
                                            <img
                                                src={
                                                    game.imageUrl ||
                                                    game.ImageUrl
                                                }
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
                                                    <p>
                                                        {game.title ||
                                                            game.Title}
                                                    </p>
                                                    <p>
                                                        {game.price ||
                                                            game.Price}
                                                        $
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="row mt-4">
                            {data.slice(0, 9).map((game, key) => {
                                return (
                                    <div className="col-4 mt-3" key={key}>
                                        <div
                                            className="card click"
                                            style={{
                                                height: "100%",
                                                border: "0",
                                                backgroundColor: "#272727",
                                                color: "white",
                                            }}
                                            onClick={(e) =>
                                                handleGameClick(e, game.gameID)
                                            }
                                        >
                                            <img
                                                src={
                                                    game.imageUrl ||
                                                    game.ImageUrl
                                                }
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
                                                    <p>
                                                        {game.title ||
                                                            game.Title}
                                                    </p>
                                                    <p>
                                                        {game.price ||
                                                            game.Price}
                                                        $
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameSets;
