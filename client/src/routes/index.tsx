import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Raiz from "../Components/Pages/Raiz";
import Home from "../Components/Pages/Home";
import All from "../Components/Pages/Projects/All";
import Open from "../Components/Pages/Projects/Open";
import Close from "../Components/Pages/Projects/Close";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/" element={<Raiz /> }/>
            <Route path="/home" element={<Home /> } />
            <Route path="/projects" element={<All /> } />
            <Route path="/projects/open" element={<Open /> } />
            <Route path="/projects/close" element={<Close /> } />
        </Routes>
    )
}

export default RoutesApp;