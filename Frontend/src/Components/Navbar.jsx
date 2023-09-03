import { useState, useEffect } from "react";
import "../Styles/Navbar.css";
import { useNavigate, useParams } from "react-router-dom";

function Navbar() {
    const [navbarBg, setNavbarBg] = useState("transparent");

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            // Define the threshold at which the Navbar color changes
            const scrollThreshold = 100; // Adjust this value as needed

            // Set the Navbar background color based on the scroll position
            if (scrollY > scrollThreshold) {
                setNavbarBg("rgba(0, 0, 0, 0.9)"); // Change to your desired background color
            } else {
                setNavbarBg("transparent");
            }
        };

        // Attach the scroll event listener when the component mounts
        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener when the component unmounts
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
                            <div className="">
                                <i class="bi bi-cart text-white fs-3 me-3 click"></i>
                                <i class="bi bi-person-circle fs-3 click"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
