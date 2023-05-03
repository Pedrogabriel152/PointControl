import React, { useContext } from "react";
import { Link } from "react-router-dom";

// CSS
import './Header.css';

// API
import { api } from "../../../utils/api";

// Context 
import { AuthContext } from "../../../Context/aurh";
import { toast } from "react-toastify";

const Header = () => {

    const {user, logout}:any = useContext(AuthContext);

    const sair = () => {
        api.defaults.headers.Authorization = `Bearer ${user.token}`;
        api.delete('/api/logout')
        .then(() => {
            logout();
        })
        .catch(() => {
            toast.error('Tente novamente');
        })
    }

    return (
        <header>
            <div className="logo">
                <Link to={'/home'}>Logo</Link>
            </div>
            <ul>
                <li><Link to={'/home'}>Home</Link></li>
                <li><Link to={'/projects'}>Projetos</Link></li>
                <li><Link to={'/profile'}>Perfil</Link></li>
                <li onClick={sair}><Link to={'/'}>Sair</Link></li>
            </ul>
        </header>
    );
}

export default Header;