import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Raiz from "../Components/Pages/Raiz";
import Home from "../Components/Pages/Home";
import All from "../Components/Pages/Projects/All";
import Open from "../Components/Pages/Projects/Open";
import Close from "../Components/Pages/Projects/Close";
import Profile from "../Components/Pages/Profile";

import Private from "./private";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/" element={<Raiz /> }/>
            <Route path="/home" element={<Private><Home /></Private> } />
            <Route path="/projects" element={<Private><All /></Private> } />
            <Route path="/projects/open" element={<Private><Open /></Private> } />
            <Route path="/projects/close" element={<Private><Close /></Private> } />
            <Route path="/profile" element={<Private><Profile /></Private> } />
        </Routes>
    )
}

export default RoutesApp;