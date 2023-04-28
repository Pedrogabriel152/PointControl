import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Raiz from "../Components/Pages/Raiz";
import Home from "../Components/Pages/Home";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/" element={<Raiz /> }/>
            <Route path="/home" element={<Home /> } />
        </Routes>
    )
}

export default RoutesApp;