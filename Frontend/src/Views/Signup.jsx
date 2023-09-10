import { useState, useContext } from "react";
import { AuthContext } from "../Utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../Utils/Request";
import "../Styles/auth.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [number, setNumber] = useState("");

    const [address, setAddress] = useState("");
    const [document, setDocument] = useState(0);
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [type, setType] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleLastnameChange = (e) => {
        e.preventDefault();
        setLastname(e.target.value);
    };

    const handleNumberChange = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
    };

    //news

    const handleAddressChange = (e) => {
        e.preventDefault();
        setAddress(e.target.value);
    };

    const handleAgeChange = (e) => {
        e.preventDefault();
        setAge(e.target.value);
    };

    const handleDocumentChange = (e) => {
        e.preventDefault();
        setDocument(e.target.value);
    };

    const handleTypeChange = (e) => {
        e.preventDefault();
        setType(e.target.value);
    };

    const handleGenderChange = (e) => {
        e.preventDefault();
        setGender(e.target.value);
    };

    const nav = function (e, place) {
        e.preventDefault();
        return navigate(place);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await postRequest("/Auth/signup", {
            email,
            password,
            name,
            lastname,
            address,
            cellphone: number,
            gender,
            documentType: type,
            documento: document,
            age,
            IsAdmin: false,
        });

        console.log(Object.keys(user));

        if (user.ok) {
            const user = await response.json();
            await login(user);
            return navigate("/home");
        }
    
        console.log("Invalid username or password");
    };

    return (
        <div
            className="px-4 py-5 px-md-5 text-center text-lg-start d-flex align-items-center"
            style={{ height: "100vh" }}
        >
            <div className="container">
                <div className="row gx-lg-5 align-items-center">
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <h1 className="my-5 display-3 fw-bold ls-tight text-white">
                            Compre los mejores juegos en <span></span>
                            <span className="text" style={{ color: "#eb5e28" }}>
                                PlayPalace
                            </span>
                        </h1>
                    </div>

                    <div
                        className="col-lg-8 mb-5"
                        style={{ marginTop: "10em" }}
                    >
                        <div
                            className="card text-white"
                            style={{ backgroundColor: "rgba(16,16,16,.4)" }}
                        >
                            <div className="card-body py-5 px-md-5">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            {" "}
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example1"
                                                >
                                                    Nombres
                                                </label>
                                                <input
                                                    type="text"
                                                    id="form3Example1"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleNameChange(e)
                                                    }
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example2"
                                                >
                                                    Apellidos
                                                </label>
                                                <input
                                                    type="text"
                                                    id="form3Example2"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleLastnameChange(e)
                                                    }
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example3"
                                                >
                                                    Celular
                                                </label>
                                                <input
                                                    type="number"
                                                    id="form3Example3"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleNumberChange(e)
                                                    }
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example4"
                                                >
                                                    Direccion
                                                </label>
                                                <input
                                                    type="text"
                                                    id="form3Example4"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleAddressChange(e)
                                                    }
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example4"
                                                >
                                                    Genero
                                                </label>
                                                <input
                                                    type="text"
                                                    id="form3Example4"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleGenderChange(e)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example4"
                                                >
                                                    Tipo de documento
                                                </label>
                                                <input
                                                    type="text"
                                                    id="form3Example4"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleTypeChange(e)
                                                    }
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example4"
                                                >
                                                    Documento
                                                </label>
                                                <input
                                                    type="number"
                                                    id="form3Example4"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleDocumentChange(e)
                                                    }
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example4"
                                                >
                                                    Edad
                                                </label>
                                                <input
                                                    type="number"
                                                    id="form3Example4"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleAgeChange(e)
                                                    }
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example3"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="form3Example3"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleEmailChange(e)
                                                    }
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example4"
                                                >
                                                    Contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    id="form3Example4"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handlePasswordChange(e)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 mb-4"
                                        onClick={(e) => handleSubmit(e)}
                                        style={{
                                            backgroundColor: "#eb5e28",
                                            border: "none",
                                        }}
                                    >
                                        Sign up
                                    </button>

                                    <div>
                                        Ya tiene cuenta,{" "}
                                        <a
                                            className="text-white"
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => nav(e, "/login")}
                                        >
                                            inicie sesion aqui
                                        </a>
                                    </div>

                                    <hr />

                                    <div className="text-center">
                                        <p>o ingrese con:</p>
                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i
                                                className="bi bi-facebook"
                                                style={{ color: "#eb5e28" }}
                                            ></i>
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i
                                                className="bi bi-google"
                                                style={{ color: "#eb5e28" }}
                                            ></i>
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i
                                                className="bi bi-twitter"
                                                style={{ color: "#eb5e28" }}
                                            ></i>
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i
                                                className="bi bi-github"
                                                style={{ color: "#eb5e28" }}
                                            ></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
