import React, { useState, useEffect } from "react";
import { postRequest } from "../Utils/Request";

function AddGame({ setScreen }) {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(0);
    const [director, setDirector] = useState("");
    const [producer, setProducer] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newGame = {
            Title: title,
            Year: year, // Convert year to a Date object
            Director: director,
            Producer: producer,
            ImageUrl: imageUrl,
            Price: parseFloat(price), // Parse price as a float
            Description: description,
        };

        try {
            await postRequest("/Games/CreateGame", newGame);
            setShowToast(true);
        } catch (error) {
            console.error("Error creating game:", error);
        }
    };

    return (
        <div>
            <button
                className="btn btn-secondary mb-5"
                onClick={(e) => setScreen(0)}
            >
                <i className="bi bi-arrow-left"></i> Volver al panel
            </button>
            <form className="text-white">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label mb-3">
                        Titulo
                    </label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label mb-3">
                        Año
                    </label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value, 10))}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="director" className="form-label mb-3">
                        Director
                    </label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="director"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="producer" className="form-label mb-3">
                        Productor
                    </label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="producer"
                        value={producer}
                        onChange={(e) => setProducer(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label mb-3">
                        URL imagen de referencia
                    </label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label mb-3">
                        Precio
                    </label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="form-label mb-3">
                        Descripcion
                    </label>
                    <textarea
                        className="form-control mb-3"
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Crear juego
                </button>
            </form>
            {showToast && (
                <div className="card text-bg-secondary text-white p-3 mt-4">
                    <div className="d-flex justify-content-between">
                        Se creo exitosamente{" "}
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={(e) => setShowToast(false)}
                        ></button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddGame;
