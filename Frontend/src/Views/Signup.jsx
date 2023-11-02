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
    const [error, setError] = useState(false);

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
            Email: email,
            Password: password,
            Name: name,
            LastName: lastname,
            Address: address,
            Cellphone: number,
            Gender: gender,
            DocumentType: type,
            Documento: document,
            Age: age,
            IsAdmin: false,
        });

        if (user.message === "User registered successfully.") {
            await login(user.user);
            return navigate("/home");
        }

        return setError(true);
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
                                                    htmlFor="nombre"
                                                >
                                                    Nombres
                                                </label>
                                                <input
                                                    type="text"
                                                    id="nombre"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleNameChange(e)
                                                    }
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="apellido"
                                                >
                                                    Apellidos
                                                </label>
                                                <input
                                                    type="text"
                                                    id="apellido"
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
                                                    htmlFor="dir"
                                                >
                                                    Direccion
                                                </label>
                                                <input
                                                    type="text"
                                                    id="dir"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleAddressChange(e)
                                                    }
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="gender"
                                                >
                                                    Genero
                                                </label>
                                                <select
                                                    name="gender"
                                                    id="gender"
                                                    className="form-select"
                                                    onChange={(e) =>
                                                        handleGenderChange(e)
                                                    }
                                                >
                                                    <option value="masculino">
                                                        Masculino
                                                    </option>
                                                    <option value="femenino">
                                                        Femenino
                                                    </option>
                                                    <option value="no binario">
                                                        No binario
                                                    </option>
                                                    <option value="Prefiero no decirlo">
                                                        Prefiero no decirlo
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="tipo"
                                                >
                                                    Tipo de documento
                                                </label>
                                                <select
                                                    name="tipo"
                                                    id="tipo"
                                                    className="form-select"
                                                    onChange={(e) =>
                                                        handleTypeChange(e)
                                                    }
                                                >
                                                    <option value="Cedula">
                                                        Cedula
                                                    </option>
                                                    <option value="Tarjeta de identidad">
                                                        Tarjeta de identidad
                                                    </option>
                                                    <option value="Pasaporte">
                                                        Pasaporte
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="doc"
                                                >
                                                    Documento
                                                </label>
                                                <input
                                                    type="number"
                                                    id="doc"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleDocumentChange(e)
                                                    }
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="age"
                                                >
                                                    Edad
                                                </label>
                                                <input
                                                    type="number"
                                                    id="age"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleAgeChange(e)
                                                    }
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="email"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleEmailChange(e)
                                                    }
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="password"
                                                >
                                                    Contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handlePasswordChange(e)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        {error ? (
                                            <p className="text-danger">
                                                Error al crear cuenta, su
                                                contraseña debe tener al menos 8
                                                caracteres, una mayuscula, una
                                                minuscula, un numero y un
                                                caracter especial.
                                            </p>
                                        ) : null}
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
                                        Registrarse
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
