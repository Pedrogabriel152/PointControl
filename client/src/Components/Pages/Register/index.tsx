import React, { ChangeEvent, useState } from "react";

// Layouts
import Form from "../../Layouts/Form";

const Register = () => {

    const [user, setUser] = useState<any>({});

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

    return (
        <div className="login">
            <h1>Cadastrar</h1>
            <Form 
                inputs={inputs}
                submit="Cadastrar-se"
            />
        </div>
    );
}

export default Register;