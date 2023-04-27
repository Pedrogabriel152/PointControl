import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Raiz from "../Components/Pages/Raiz";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/" element={<Raiz /> }/>
        </Routes>
    )
}

export default RoutesApp;