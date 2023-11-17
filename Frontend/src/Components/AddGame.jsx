import React, { useState, useEffect } from "react";
import { postRequest, getRequest } from "../Utils/Request";

function AddGame({ setScreen }) {
    // Define state variables to store input values
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(0);
    const [director, setDirector] = useState("");
    const [producer, setProducer] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [showToast, setShowToast] = useState(false);

    // State variables to manage selected platforms
    const [platforms, setPlatforms] = useState([]);
    const [selectedPlataformsId, setSelectedPlataformsId] = useState([]);
    const [selectedPlataformsName, setSelectedPlataformsName] = useState([]);

    // Define icons for different platforms
    const icons = {
        Xbox: <i className="bi bi-xbox"></i>,
        Playstation: <i className="bi bi-playstation"></i>,
        Nintendo: <i className="bi bi-nintendo-switch"></i>,
        PC: <i className="bi bi-pc"></i>,
    };

    // Handle platform selection
    const handlePlatformChange = (e) => {
        let newValue = e.target.value;
        newValue = newValue.split(",");

        if (!selectedPlataformsId.includes(newValue[0])) {
            setSelectedPlataformsId([...selectedPlataformsId, newValue[0]]);
            setSelectedPlataformsName([...selectedPlataformsName, newValue[1]]);
        }
    };

    // Handle platform deletion
    const deletePlatform = (e, id) => {
        e.preventDefault();

        const indexToRemove = selectedPlataformsId.indexOf(id);

        if (indexToRemove !== -1) {
            const newSelectedPlataformsId = [...selectedPlataformsId];
            const newSelectedPlataformsName = [...selectedPlataformsName];
            newSelectedPlataformsId.splice(indexToRemove, 1);
            newSelectedPlataformsName.splice(indexToRemove, 1);
            setSelectedPlataformsId(newSelectedPlataformsId);
            setSelectedPlataformsName(newSelectedPlataformsName);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newGame = {
            title: title,
            year: year,
            director: director,
            producer: producer,
            imageUrl: imageUrl,
            price: parseFloat(price),
            description: description,
            platformIds: selectedPlataformsId,
        };

        try {
            // Send a POST request to create a new game with the provided details
            await postRequest("/Games/CreateGame", newGame);
            setShowToast(true);
        } catch (error) {
            console.error("Error creating game:", error);
        }
    };

    // Fetch the available platforms from the API
    const getPlatforms = async function () {
        const response = await getRequest("/Games/platforms");
        setPlatforms(response);
    };

    // Trigger the getPlatforms function when the component mounts
    useEffect(() => {
        getPlatforms();
    }, []); // Removed [platforms] to prevent infinite loop

    return (
        <div>
            <button
                className="btn btn-secondary mb-5"
                onClick={(e) => setScreen(0)}
            >
                <i className="bi bi-arrow-left"></i> Return to the panel
            </button>
            <form className="text-white">
                {/* Input fields for game details */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titulo</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Año de lanzamiento</label>
                    <input type="number" className="form-control" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="director" className="form-label">Director</label>
                    <input type="text" className="form-control" id="director" value={director} onChange={(e) => setDirector(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="producer" className="form-label">Productor</label>
                    <input type="text" className="form-control" id="producer" value={producer} onChange={(e) => setProducer(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">URL de la imagen</label>
                    <input type="text" className="form-control" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio de alquiler</label>
                    <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripcion</label>
                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                {/* Add similar input fields for other details */}

                {/* Platform selection */}
                <div className="mb-3">
                    <label htmlFor="platforms" className="form-label">Select Platforms</label>
                    <select
                        className="form-select"
                        onChange={handlePlatformChange}
                        value=""
                    >
                        <option value="" disabled>Select platform...</option>
                        {platforms.map((platform) => (
                            <option key={platform.platformID} value={`${platform.platformID},${platform.name}`}>
                                {icons[platform.name]} {platform.name}
                            </option>
                        ))}
                    </select>
                    {/* Display selected platforms */}
                    <div className="mt-3">
                        {selectedPlataformsName.map((name, index) => (
                            <span key={index} className="badge bg-secondary me-2">
                                {name} <span className="click" onClick={(e) => deletePlatform(e, selectedPlataformsId[index])}>x</span>
                            </span>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Create Game
                </button>
            </form>

            {/* Bootstrap toast for showing success message */}
            {showToast && (
                <div className="card text-bg-secondary text-white p-3 mt-4">
                    <div className="d-flex justify-content-between">
                        Successfully created{" "}
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
