import React from "react";

// CSS
import './Raiz.css';

// Pages
import Login from "../Login";
import Register from "../Register";

const Raiz = () => {
    return (
        <div className="container">
            <Login />
            <div className="linha"></div>
            <Register />
        </div>
    )
}

export default Raiz;