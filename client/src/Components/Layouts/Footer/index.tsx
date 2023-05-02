import React from "react";

// CSS
import './Footer.css';

// Icons
import { BsGithub, BsLinkedin } from 'react-icons/bs'

const Footer = () => {
    const data = new Date();
    return (
        <footer>
            <p>Pedro Gabriel &copy; {data.getFullYear()} - Todos os direitos reservados.</p>
            <div className="links">
                <a href="https://github.com/Pedrogabriel152">
                    <BsGithub 
                        size={25}
                        color="#000"
                    />
                </a>

                <a href="https://github.com/Pedrogabriel152">
                    <BsLinkedin 
                        size={25}
                        color="#000"
                    />
                </a>
            </div>
        </footer>
    );
}

export default Footer;