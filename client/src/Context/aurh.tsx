import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// API
import { api } from "../utils/api";

export const AuthContext = createContext({});

const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storageUser = localStorage.getItem('@ticketsPRO');

        if(!storageUser){
            setLoading(false);
            return
        }

        setUser(JSON.parse(storageUser));
        setLoading(false);
    }, []);

    const storageUser = (data: any) => {
        localStorage.setItem('@ticketsPRO', JSON.stringify(data));
    }

    const logout = async () => {
        localStorage.removeItem('@token');
        localStorage.removeItem('@user');
        setUser(null);
        navigate('/');
    }

    return (
        <AuthContext.Provider 
            value={{ 
                user,
                loading,
                logout,
                storageUser,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;