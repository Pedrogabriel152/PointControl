import React, { ChangeEvent, useState } from "react";

// Layouts
import Form from "../../Layouts/Form";

const Login = () => {

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
            text: 'Senha:',
            type: 'password',
            name: 'password',
            placeholder: 'Sua senha',
            value: user.password,
            handleOnChange: handleOnChange
        }
    ];

    return (
        <div className="login">
            <h1>Login</h1>
            <Form 
                inputs={inputs}
                submit="Entrar"
            />
        </div>
    );
}

export default Login;