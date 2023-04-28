import React from "react";
import { Link } from "react-router-dom";

// CSS
import './Header.css';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <Link to={'/home'}>Logo</Link>
            </div>
            <ul>
                <li><Link to={'/home'}>Home</Link></li>
                <li><Link to={'/projects'}>Projetos</Link></li>
                <li><Link to={'/logout'}>Sair</Link></li>
            </ul>
        </header>
    );
}

export default Header;