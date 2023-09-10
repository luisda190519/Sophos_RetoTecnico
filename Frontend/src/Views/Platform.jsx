import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../Utils/Request";
import Navbar from "../Components/Navbar";
import ListGames from "../Components/ListGames";
import "../Styles/Navbar.css"

function Platform() {
    const [games, setGames] = useState([]);
    const { platformName } = useParams();

    useEffect(() => {
        async function fetchGamesByPlatform() {
            try {
                const response = await getRequest(
                    `/games/byplatform?platformName=${platformName}`
                );

                if (Array.isArray(response)) {
                    setGames(response);
                } else {
                    console.error("Invalid response:", response);
                }
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        }
        fetchGamesByPlatform();
    }, [platformName]); 


    return (
        <div>
            <Navbar></Navbar>
            <ListGames games={games} platform={platformName}></ListGames>
        </div>
    )
}

export default Platform;
