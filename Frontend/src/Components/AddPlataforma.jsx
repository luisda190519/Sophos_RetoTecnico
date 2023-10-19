import { useState } from "react";
import { postRequest } from "../Utils/Request";

function AddPlataforma({ setScreen }) {
    // Define a state variable to store the input value
    const [value, setValue] = useState("");
    const [showToast, setShowToast] = useState(false);

    // Handle input change
    const handleChange = function (e) {
        e.preventDefault();
        setValue(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async function (e) {
        e.preventDefault();
        try {
            // Send a POST request to create a new platform with the provided name
            await postRequest("/Games/CreatePlatform", { name: value });
            setShowToast(true);
        } catch (error) {
            console.error(error);
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
            <form className="text-white" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="1" className="form-label mb-3">
                        Platform Name
                    </label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="1"
                        value={value}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
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

export default AddPlataforma;
