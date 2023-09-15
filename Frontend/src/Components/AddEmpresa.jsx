import { useState } from "react";
import { postRequest } from "../Utils/Request";

function AddEmpresa({ setScreen }) {
    const [value, setValue] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleChange = function (e) {
        e.preventDefault();
        setValue(e.target.value);
    };

    const handleSubmit = async function (e) {
        e.preventDefault();
        try {
            await postRequest("/Games/CreateBrand", { name: value });
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
                <i className="bi bi-arrow-left"></i> Volver al panel
            </button>
            <form className="text-white" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="1" className="form-label mb-3">
                        Nombre de la empresa
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

            {/* Bootstrap toast */}
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

export default AddEmpresa;
