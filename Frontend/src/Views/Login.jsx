import { useState, useContext } from "react";
import { postRequest } from "../Utils/Request";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Utils/AuthContext";
import "../Styles/auth.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const nav = function (e, place) {
        e.preventDefault();
        return navigate(place);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await postRequest("/Auth/signin", {
            email,
            password,
        });

        if (
            typeof user === "object" &&
            user !== null &&
            Object.keys(user).length > 1
        ) {
            await login(user);
            return navigate("/home");
        }

        console.log("Usuario o email incorrecto");
    };

    return (
        <div
            className="px-4 py-5 px-md-5 text-center text-lg-start d-flex align-items-center"
            style={{ height: "100vh" }}
        >
            <div className="container">
                <div className="row gx-lg-5 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <h1 className="my-5 display-3 fw-bold ls-tight text-white">
                            Compre los mejores juegos en <span></span>
                            <span className="text" style={{ color: "#eb5e28" }}>
                                PlayPalace
                            </span>
                        </h1>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0 ">
                        <div
                            className="card text-white"
                            style={{ backgroundColor: "rgba(16,16,16,.4)" }}
                        >
                            <div className="card-body py-5 px-md-5">
                                <form>
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
                                            className="form-control text-white"
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

                                    <button
                                        type="submit"
                                        className="btn btn-primary mb-4 w-100"
                                        onClick={(e) => handleSubmit(e)}
                                        style={{
                                            backgroundColor: "#eb5e28",
                                            border: "none",
                                        }}
                                    >
                                        Log in
                                    </button>

                                    <div>
                                        No tiene cuenta,{" "}
                                        <a
                                            className="text-white"
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => nav(e, "/signup")}
                                        >
                                            registrese gratis aqui
                                        </a>
                                    </div>

                                    <hr />

                                    <div className="text-center">
                                        <p>o ingrese con:</p>
                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i className="bi bi-facebook" style={{color:"#eb5e28"}}></i>
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i className="bi bi-google" style={{color:"#eb5e28"}}></i>
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i className="bi bi-twitter" style={{color:"#eb5e28"}}></i>
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i className="bi bi-github" style={{color:"#eb5e28"}}></i>
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

export default Login;
