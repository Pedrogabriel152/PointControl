import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// Layouts
import Form from "../../Layouts/Form";

// API
import { api } from "../../../utils/api";

const Register = () => {

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
            text: 'Nome:',
            type: 'text',
            name: 'name',
            placeholder: 'Seu nome',
            value: user.name,
            handleOnChange: handleOnChange
        },
        {
            text: 'Seu custo por hora:',
            type: 'number',
            name: 'valor_hora',
            placeholder: 'Seu nome',
            value: user.valor_hora,
            handleOnChange: handleOnChange
        },
        {
            text: 'Senha:',
            type: 'password',
            name: 'password',
            placeholder: 'Sua senha',
            value: user.password,
            handleOnChange: handleOnChange
        },
        {
            text: 'Confirme a senha:',
            type: 'password',
            name: 'confirmpassword',
            placeholder: 'Digite a senha novamente',
            value: user.confirmpassword,
            handleOnChange: handleOnChange
        }
    ];

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();
        api.post('/api/create', {
            email: user.email,
            name: user.name,
            valor_hora: user.valor_hora,
            password: user.password,
            confirmpassword: user.confirmpassword
        })
        .then((res: any) => {
            localStorage.setItem('token', JSON.stringify(res.data.token));
            localStorage.setItem('user', res.data.user_id);
            navigate('/home');
        })
        .catch((error: any) => {
            setMensagem(error.response.data.message);
        })
    }

    return (
        <div className="login">
            <h1>Cadastrar</h1>
            <Form 
                inputs={inputs}
                submit="Cadastrar-se"
                handleSubmit={handleSubmit}
                mensagem={mensagem}
            />
        </div>
    );
}

export default Register;