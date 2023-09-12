import "../Styles/Navbar.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequest } from "../Utils/Request";
import Navbar from "../Components/Navbar";

function ExpandedGame() {
    const [game, setGame] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [MCS, setMCS] = useState([]);
    const [brands, setBrands] = useState([]);
    const { gameID } = useParams();
    const ratingStars = generateRandomRating();
    const navigate = useNavigate();

    const icons = {
        Xbox: <i className="bi bi-xbox"></i>,
        Playstation: <i className="bi bi-playstation"></i>,
        Nintendo: <i className="bi bi-nintendo-switch"></i>,
        PC: <i className="bi bi-pc"></i>,
    };

    function generateRandomRating() {
        const rating = Math.random() * 5;
        const roundedRating = Math.round(rating * 2) / 2;
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < roundedRating) {
                stars.push(<i className="bi bi-star-fill" key={i}></i>);
            } else if (
                i === Math.floor(roundedRating) &&
                roundedRating % 1 !== 0
            ) {
                stars.push(<i className="bi bi-star-half" key={i}></i>);
            } else {
                stars.push(<i className="bi bi-star" key={i}></i>);
            }
        }

        return stars;
    }

    useEffect(() => {
        async function fetchGamesByID() {
            try {
                let response = await getRequest(`/games/${gameID}`);
                setGame(response);
                response = await getRequest("/games/platforms/" + gameID);
                setPlatforms(response);
                response = await getRequest("/games/maincharacters/" + gameID);
                setMCS(response);
                response = await getRequest("/games/brands/" + gameID);
                setBrands(response);
                console.log(brands);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        }
        fetchGamesByID();
    }, [gameID]);

    return (
        <div>
            <Navbar></Navbar>
            <div className="container" style={{ marginTop: "10em" }}>
                <div className="row">
                    <div className="col-6">
                        <img src={game.imageUrl} className="img-fluid" />
                    </div>
                    <div className="col-6">
                        <div
                            className="card"
                            style={{
                                height: "100%",
                                backgroundColor: "#101010",
                            }}
                        >
                            <div className="mt-5">
                                <h3 className="text-center text-white">
                                    {game.title}
                                </h3>
                                <div className="card-body">
                                    {platforms.map((platform, key) => (
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark rounded-pill me-3 w-25"
                                            disabled
                                            style={{
                                                color: "white",
                                                backgroundColor: "#272727",
                                            }}
                                            key={key}
                                        >
                                            {icons[platform.name.split(" ")[0]]}
                                            <span className="me-3"></span>
                                            {platform.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    className="btn btn-primary w-75"
                                    style={{
                                        backgroundColor: "#eb5e28",
                                        border: "none",
                                    }}
                                >
                                    Alquilar juego
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-6">
                        <h3 className="text-white">Acerca del Juego</h3>
                        <p className="text-secondary">{game.description}</p>
                    </div>
                    <div className="col-6">
                        <h3 className="text-white">
                            Basado en {Math.round(Math.random() * 20) + 1}{" "}
                            reviews
                        </h3>
                        <div className="game-rating mb-2">
                            {ratingStars.map((star, index) => (
                                <span className="fs-3" key={index}>
                                    {star}
                                </span>
                            ))}
                        </div>
                        <div className="row">
                            <div className="col-6 text-secondary">
                                Instalación:
                            </div>
                            <div className="col-6 text-white">
                                Cómo activar tu juego
                            </div>
                            <div className="col-6 text-secondary">
                                Director:
                            </div>
                            <div className="col-6 text-white">
                                {game.director}
                            </div>
                            <div className="col-6 text-secondary">
                                Productor:
                            </div>
                            <div className="col-6 text-white">
                                {game.producer}
                            </div>
                            <div className="col-6 text-secondary">Precio:</div>
                            <div className="col-6 text-white">
                                {game.price}$
                            </div>
                            <div className="col-6 text-secondary">
                                Empresa/s:
                            </div>
                            <div className="col-6 text-white">
                                {brands.map((brand, key) => {
                                    return <p key={key}>{brand.name}</p>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpandedGame;
