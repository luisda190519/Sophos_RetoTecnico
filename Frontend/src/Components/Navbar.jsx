import { useState, useEffect, useContext, useRef } from "react";
import "../Styles/Navbar.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Utils/AuthContext";

function Navbar() {
    const [navbarBg, setNavbarBg] = useState("transparent");
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { logout } = useContext(AuthContext);
    const { userAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState(userAuthenticated || false);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    const nav = function (e, place) {
        e.preventDefault();
        return navigate(place);
    };

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
        if (!searchVisible) {
            setTimeout(() => {
                searchInputRef.current.focus();
            }, 0);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("first")
        navigate(`/game/name/${searchQuery}`);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setSearchVisible(false);
        }, 500)
    };

    const handleAdvance = (e) => {
        e.preventDefault();
        navigate(`/game/advance/advance/`);
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
                            <div
                                className="d-flex align-items-center justify-content-center click"
                                onClick={(e) => nav(e, "/home")}
                            >
                                <i className="bi bi-controller fs-2"></i>
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
                                    {searchVisible ? (
                                        <div className="">
                                            <div className="">
                                                <div className="">
                                                    <div
                                                        className="input-group mb-3 rounded"
                                                        onLostPointerCapture={
                                                            toggleSearch
                                                        }
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control text-white py-2 mt-3"
                                                            placeholder="Search for a game"
                                                            id="input"
                                                            ref={searchInputRef}
                                                            onBlur={handleBlur}
                                                            value={searchQuery}
                                                            onChange={(e) =>
                                                                setSearchQuery(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            className="btn btn-outline-secondary py-2 mt-3"
                                                            type="button"
                                                            onClick={e => handleSearch(e)}
                                                            id="outer"
                                                        >
                                                            <i
                                                                className="bi bi-search"
                                                                id="naranja"
                                                            ></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-secondary py-2 mt-3 text-white ms-3"
                                                            type="button"
                                                            onClick={
                                                                e => handleAdvance(e)
                                                            }
                                                            id="outer"
                                                            style={{
                                                                backgroundColor:
                                                                    "#eb5e40",
                                                            }}
                                                        >
                                                            Busquedas avanzadas
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <ul className="navbar-nav ml-auto">
                                            <li className="nav-item active click">
                                                <a
                                                    className="nav-link"
                                                    onClick={(e) =>
                                                        nav(e, "/game/platform/PC")
                                                    }
                                                >
                                                    PC
                                                    <i className="bi bi-chevron-down ms-1 text-secondary"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item click">
                                                <a
                                                    className="nav-link"
                                                    onClick={(e) =>
                                                        nav(
                                                            e,
                                                            "/game/platform/Playstation"
                                                        )
                                                    }
                                                >
                                                    Playstation
                                                    <i className="bi bi-chevron-down ms-1 text-secondary"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item click">
                                                <a
                                                    className="nav-link"
                                                    onClick={(e) =>
                                                        nav(e, "/game/platform/Xbox")
                                                    }
                                                >
                                                    Xbox
                                                    <i className="bi bi-chevron-down ms-1 text-secondary"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item click">
                                                <a
                                                    className="nav-link"
                                                    onClick={(e) =>
                                                        nav(
                                                            e,
                                                            "/game/platform/Nintendo"
                                                        )
                                                    }
                                                >
                                                    Nintendo
                                                    <i className="bi bi-chevron-down ms-1 text-secondary"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <button
                                                    className="btn btn-outline-dark rounded-pill py-2 px-3"
                                                    id="outer"
                                                    onClick={toggleSearch}
                                                >
                                                    <i
                                                        className="bi bi-search"
                                                        id="naranja"
                                                    ></i>
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-2 d-flex justify-content-end align-items-center">
                            {user ? (
                                <div className="">
                                    <i className="bi bi-cart text-white fs-3 me-3 click"></i>
                                    <i className="bi bi-person-circle fs-3 click me-3"></i>
                                    <i className="bi bi-box-arrow-right fs-3 click "></i>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="btn btn-secondary me-3"
                                        onClick={(e) => nav(e, "/login")}
                                    >
                                        Sign in
                                    </button>
                                    <button
                                        className="btn btn-secondary me-3"
                                        onClick={(e) => nav(e, "/signup")}
                                    >
                                        Sign up
                                    </button>
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
