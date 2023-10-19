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

        if (!selectedPlataformsId.includes(newValue)) {
            setSelectedPlataformsId([...selectedPlataformsId, newValue[0]]);
            setSelectedPlataformsName([...selectedPlataformsName, newValue[1]]);
        }
    };

    // Handle platform deletion
    const deletePlatform = (e, name) => {
        e.preventDefault();

        const indexToRemove = selectedPlataformsName.indexOf(name);

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
            Title: title,
            Year: year,
            Director: director,
            Producer: producer,
            ImageUrl: imageUrl,
            Price: parseFloat(price),
            Description: description,
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
    }, [platforms]);

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
                {/* ... (omitted for brevity) ... */}
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
