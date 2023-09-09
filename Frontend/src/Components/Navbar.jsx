import { useState, useEffect, useContext } from "react";
import "../Styles/Navbar.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Utils/AuthContext";

function Navbar() {
    const [navbarBg, setNavbarBg] = useState("transparent");
    const { logout } = useContext(AuthContext);
    const { userAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState(userAuthenticated || false);
    const navigate = useNavigate();

    const nav = function (e, place) {
        e.preventDefault();
        return navigate(place);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollThreshold = 100;
            if (scrollY > scrollThreshold) {
                setNavbarBg("rgba(0, 0, 0, 0.9)");
            } else {
                setNavbarBg("transparent");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    console.log(user)

    return (
        <nav
            id="navbar"
            className="navbar navbar-expand-lg navbar-light"
            style={{
                position: "fixed",
                width: "100%",
                top: "0",
                backgroundColor: navbarBg,
                zIndex: "1000",
                transition: "background-color 0.3s ease",
            }}
        >
            <div className="" style={{ width: "100%" }}>
                <div className="container-fluid">
                    <div className="row gx-0">
                        <div className="col-2 d-flex align-items-center justify-content-center">
                            <div className="d-flex align-items-center justify-content-center">
                                <i class="bi bi-controller fs-2"></i>
                                <p className="fs-3 ms-3 mt-3">
                                    <span>P</span>lay<span>P</span>alace
                                </p>
                            </div>
                        </div>
                        <div className="col-8 d-flex align-items-center justify-content-center">
                            <div>
                                <div
                                    className="collapse navbar-collapse"
                                    id="navbarNav"
                                >
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="#">
                                                PC
                                                <i class="bi bi-chevron-down ms-1 text-secondary"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                Playstation
                                                <i class="bi bi-chevron-down ms-1 text-secondary"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                Xbox
                                                <i class="bi bi-chevron-down ms-1 text-secondary"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                Nintendo
                                                <i class="bi bi-chevron-down ms-1 text-secondary"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-2 d-flex justify-content-end align-items-center">
                            {user ? (
                                <div className="">
                                    <i class="bi bi-cart text-white fs-3 me-3 click"></i>
                                    <i class="bi bi-person-circle fs-3 click me-3"></i>
                                    <i class="bi bi-box-arrow-right fs-3 click "></i>
                                </div>
                            ) : (
                                <div>
                                    <button className="btn btn-secondary me-3" onClick={e => nav(e, "/login")}>Sign in</button>
                                    <button className="btn btn-secondary me-3" onClick={e => nav(e, "/signup")}>Sign up</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
