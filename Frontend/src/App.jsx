import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import ImageHome from "./Components/ImageHome";
import GameSets from "./Components/GameSets";
import Separator from "./Components/Separator";
import "./Styles/App.css";

function App() {
    return (
        <div>
            <Navbar></Navbar>
            <ImageHome></ImageHome>
            <div className="container">
                <GameSets title={"Nuevos"} type={"/games"}></GameSets>
                <Separator></Separator>
                <div style={{marginTop:"200px"}}>
                    <GameSets
                        title={"Tendencias"}
                        type={"/rental/mostrentedgames"}
                    ></GameSets>
                </div>
            </div>
        </div>
    );
}

export default App;
