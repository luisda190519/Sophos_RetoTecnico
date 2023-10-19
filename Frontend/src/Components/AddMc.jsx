import { useState, useEffect } from "react";
import { postRequest, getRequest } from "../Utils/Request";

function AddMc({ setScreen }) {
    // Define state variables to store input values
    const [name, setName] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [selectedGameId, setSelectedGameId] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [games, setGames] = useState([]);

    // Fetch the list of games when the component mounts
    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await getRequest("/Games");
                setGames(response);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        }

        fetchGames();
    }, []);

    // Handle game selection
    const handleGameChange = (e) => {
        setSelectedGameId(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const mainCharacter = {
            Name: name,
            ImageURL: imageURL,
            GameID: selectedGameId,
        };

        try {
            // Send a POST request to create a new main character with the provided details
            await postRequest("/Games/createmaincharacter", mainCharacter);
            setShowToast(true);
        } catch (error) {
            console.error("Error creating main character:", error);
        }
    };

    return (
        <div>
            <button
                className="btn btn-secondary mb-5"
                onClick={(e) => setScreen(0)}
            >
                <i className="bi bi-arrow-left"></i> Return to the panel
            </button>
            <form className="text-white">
                {/* Input fields for main character details */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label mb-3">
                        Name of the protagonist
                    </label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageURL" className="form-label mb-3">
                        Reference image URL
                    </label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="imageURL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="gameSelect" className="form-label mb-3">
                        Select a Game
                    </label>
                    <select
                        className="form-select"
                        id="gameSelect"
                        onChange={handleGameChange}
                        value={selectedGameId}
                    >
                        <option value="" disabled>
                            Choose a game...
                        </option>
                        {games.map((game) => (
                            <option key={game.gameID} value={game.gameID}>
                                {game.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Create main character
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

export default AddMc;
