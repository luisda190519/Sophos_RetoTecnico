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
                <GameSets title={"Nuevos"}></GameSets>
                <Separator></Separator>
            </div>
        </div>
    );
}

export default App;
