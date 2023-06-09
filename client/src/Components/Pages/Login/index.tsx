import React, { ChangeEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Layouts
import Form from "../../Layouts/Form";

// API
import { api } from "../../../utils/api";

const Login = () => {

    const [user, setUser] = useState<any>({});
    const [mensagem, setMensagem] = useState<string>('');
    const navigate = useNavigate();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const inputs: any = [
        {
            text: 'E-mail:',
            type: 'email',
            name: 'email',
            placeholder: 'Seu e-mail',
            value: user.email,
            handleOnChange: handleOnChange
        },
        {
            text: 'Senha:',
            type: 'password',
            name: 'password',
            placeholder: 'Sua senha',
            value: user.password,
            handleOnChange: handleOnChange
        }
    ];

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if(localStorage.getItem('@user')){
            localStorage.removeItem('@user');
        }
        api.get('/sanctum/csrf-cookie').then(response => {
            api.post('/api/login', {
                email: user.email,
                password: user.password
            })
            .then(async (res: any) => {
                try{
                    console.log(res.data)
                    localStorage.setItem('@user', JSON.stringify(res.data));
                }catch(error: any){
                    console.log(error);
                }
                navigate('/home');
            })
            .catch((error: any) => {
                setMensagem(error.response.data.message);
            })
        });
        
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <Form 
                inputs={inputs}
                submit="Entrar"
                handleSubmit={handleSubmit}
                mensagem={mensagem}
            />
        </div>
    );
}

export default Login;