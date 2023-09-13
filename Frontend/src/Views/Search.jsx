import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../Utils/Request";
import Navbar from "../Components/Navbar";
import ListGames from "../Components/ListGames";
import Footer from "../Components/Footer";
import "../Styles/Navbar.css";

function Search() {
    const [games, setGames] = useState([]);
    const { search, type } = useParams();
    const urls = {
        platform: "/games/byplatform/?platformName=",
        name: "/Games/byname?gameName=",
        director: "/Games/bydirector?directorName=",
        producer: "/Games/byproducer?producerName=",
        brand: "/Games/bybrand?brandName=",
        year: "/Games/byyear?year=",
        mc: "/Games/bymaincharacter?characterName=",
    };

    console.log(search + "  " + type);
    

    useEffect(() => {
        async function fetchGamesByPlatform() {
            setGames("cargando");
            try {
                const response = await getRequest(urls[type] + search);

                if (Array.isArray(response)) {
                    setGames(response);
                    console.log(response);
                } else {
                    console.error("Invalid response:", response);
                    setGames(false);
                }
            } catch (error) {
                console.error("Error fetching games:", error);
                setGames(false);
            }
        }
        if (type !== "advance") {
            fetchGamesByPlatform();
        }else{
            setGames("advance");
        }
    }, [search]);

    return (
        <div>
            <Navbar></Navbar>
            <ListGames games={games} title={search} type={type}></ListGames>
            <Footer></Footer>
        </div>
    );
}

export default Search;
