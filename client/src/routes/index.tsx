import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Raiz from "../Components/Pages/Raiz";
import Home from "../Components/Pages/Home";
import Projects from "../Components/Pages/Projects";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/" element={<Raiz /> }/>
            <Route path="/home" element={<Home /> } />
            <Route path="/projects" element={<Projects /> } />
        </Routes>
    )
}

export default RoutesApp;