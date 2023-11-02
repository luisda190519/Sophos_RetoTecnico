import "../Styles/Navbar.css";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../Utils/Request";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { AuthContext } from "../Utils/AuthContext";

function ExpandedGame() {
    const [game, setGame] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [MCS, setMCS] = useState([]);
    const [brands, setBrands] = useState([]);
    const { gameID } = useParams();
    const [ratingStars, setRating] = useState(generateRandomRating());
    const [numeroReviews, setNumeroReviews] = useState(Math.round(Math.random() * 20) + 1); 
    const navigate = useNavigate();
    const { userAuthenticated } = useContext(AuthContext);
    const [rentalDate, setRentalDate] = useState(new Date());
    const [dueDate, setDueDate] = useState("");
    const [payMethod, setPayMethod] = useState("");

    const icons = {
        Xbox: <i className="bi bi-xbox"></i>,
        Playstation: <i className="bi bi-playstation"></i>,
        Nintendo: <i className="bi bi-nintendo-switch"></i>,
        PC: <i className="bi bi-pc"></i>,
    };

    const handleSelect = function (e) {
        e.preventDefault();
        setPayMethod(e.target.value);
    };

    const handleAlquilar = async function (e) {
        e.preventDefault();
        const formattedRentalDate = rentalDate.toISOString();

        if (!dueDate) {
            alert("Please select a due date.");
            return;
        }

        const bodyObject = {
            customerID: userAuthenticated.userId,
            gameID: gameID,
            dueDate: dueDate,
            payMethod: payMethod,
        };

        const response = await postRequest("/Rental/", bodyObject);

        if (response) {
            navigate("/home");
        }
    };

    function generateRandomRating() {
        const rating = Math.random() * 5;
        let roundedRating = Math.round(rating * 2) / 2;
        if (roundedRating === 0) {
            roundedRating = 1;
        }
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
                                    <div className="input-group my-3 text-white">
                                        <span
                                            className="input-group-text"
                                            style={{
                                                color: "white",
                                                backgroundColor: "#272727",
                                                border: "none",
                                            }}
                                        >
                                            Precio
                                        </span>
                                        <input
                                            type="text"
                                            value={game.price}
                                            className="form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="input-group my-3 text-white">
                                        <span
                                            className="input-group-text"
                                            style={{
                                                color: "white",
                                                backgroundColor: "#272727",
                                                border: "none",
                                            }}
                                        >
                                            Fecha de renta
                                        </span>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={dueDate}
                                            onChange={(e) =>
                                                setDueDate(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="input-group my-3 text-white">
                                        <span
                                            className="input-group-text"
                                            style={{
                                                color: "white",
                                                backgroundColor: "#272727",
                                                border: "none",
                                            }}
                                        >
                                            Medio de pago
                                        </span>
                                        <select
                                            class="form-select"
                                            id="inputGroupSelect01"
                                            onChange={(e) => handleSelect(e)}
                                        >
                                            <option selected>Escoge...</option>
                                            <option value="Tarjeta de credito/debito">
                                                Tarjeta de credito/debito
                                            </option>
                                            <option value="Cuenta bancaria">
                                                Cuenta bancaria
                                            </option>
                                            <option value="Efectivo">
                                                Efectivo
                                            </option>
                                            <option value="Paypal / nequi">
                                                Paypal / nequi
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mb-4">
                                <div className="container">
                                    <button
                                        className="btn btn-primary w-100"
                                        style={{
                                            backgroundColor: "#eb5e28",
                                            border: "none",
                                        }}
                                        onClick={(e) => handleAlquilar(e)}
                                    >
                                        Alquilar juego
                                    </button>
                                </div>
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
                            Basado en {numeroReviews}{" "}
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
                {MCS.length > 0 ? (
                    <div>
                        <h2 className="text-white mt-5">Protagonistas:</h2>
                        {MCS.map((mc, key) => {
                            return (
                                <div className="container mb-5">
                                    <h4 className="text-white mt-5">
                                        {mc.name}
                                    </h4>
                                    <img
                                        src={mc.imageURL}
                                        className="img-fluid"
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ExpandedGame;
