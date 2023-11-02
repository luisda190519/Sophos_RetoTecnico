import { useState, useEffect, useContext, useRef } from "react";
import "../Styles/Navbar.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Utils/AuthContext";
import { getRequest } from "../Utils/Request";

function Navbar() {
    // State variables and hooks for the Navbar component
    const [navbarBg, setNavbarBg] = useState("transparent");
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { logout } = useContext(AuthContext);
    const { userAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState(userAuthenticated || false);
    const [rentalsUnfinished, setRentalsUnfinished] = useState([]);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    // Function for navigating to a specific page
    const nav = function (e, place) {
        e.preventDefault();
        return navigate(place);
    };

    // Function to toggle the search bar visibility
    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
        if (!searchVisible) {
            setTimeout(() => {
                searchInputRef.current.focus();
            }, 0);
        }
    };

    // Function to handle user logout
    const handleLogOut = function (e) {
        e.preventDefault();
        logout();
        nav(e, "/home");
    };

    // Function to navigate to Rentals page
    const handleRental = function (e) {
        e.preventDefault();
        nav(e, "/Rentals");
    };

    // Function to handle game search
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/game/name/${searchQuery}`);
    };

    // Function to handle search input blur and hide search bar
    const handleBlur = () => {
        setTimeout(() => {
            setSearchVisible(false);
        }, 500);
    };

    // Function to handle advanced search
    const handleAdvance = (e) => {
        e.preventDefault();
        navigate(`/game/advance/advance/`);
    };

    // Function to get user rentals
    const getRentals = async function () {
        if (userAuthenticated) {
            let response = await getRequest(
                "/Rental/customer/" + userAuthenticated.userId + "/unfinished"
            );
            setRentalsUnfinished(response);
        }
    };

    // Scroll listener to change the navbar background color
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

    // Get user rentals when the user is authenticated
    useEffect(() => {
        getRentals();
    }, [userAuthenticated]);

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
                                                            onClick={(e) =>
                                                                handleSearch(e)
                                                            }
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
                                                            onClick={(e) =>
                                                                handleAdvance(e)
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
                                                        nav(
                                                            e,
                                                            "/game/platform/PC"
                                                        )
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
                                                        nav(
                                                            e,
                                                            "/game/platform/Xbox"
                                                        )
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
                            {userAuthenticated ? (
                                <div className="">
                                    {userAuthenticated.isAdmin ? (
                                        <button
                                            className="btn btn-secondary me-3 mb-3"
                                            onClick={(e) =>
                                                nav(e, "/adminPanel")
                                            }
                                        >
                                            Admin panel
                                        </button>
                                    ) : (
                                        <div></div>
                                    )}
                                    <i
                                        className="bi bi-cart text-white fs-3 me-3 click position-relative"
                                        onClick={(e) => handleRental(e)}
                                    >
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {rentalsUnfinished.length}
                                            <span className="visually-hidden">
                                                Rentas
                                            </span>
                                        </span>
                                    </i>
                                    <i
                                        className="bi bi-box-arrow-right fs-3 click "
                                        onClick={(e) => handleLogOut(e)}
                                    ></i>
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
