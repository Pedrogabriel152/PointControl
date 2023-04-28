import React, { ChangeEvent } from "react";

// Icons
import { RxAvatar } from 'react-icons/rx';

interface Form {
    inputs: any
    submit: string
    handleSubmit(e: ChangeEvent<HTMLFormElement>): void
    mensagem: string
}

const Form = ({inputs, submit, handleSubmit, mensagem}: Form) => {
    return (
        <form onSubmit={handleSubmit}>
            <label className="avatar">
                <RxAvatar size={90} color="#000"/>
            </label>
            
            {inputs.map((input: any, index: any) => (
                <div className="label" key={index}>
                    <label htmlFor={input.name}>{input.text}</label>
                    <input 
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        value={input.value? input.value : ''}
                        onChange={input.handleOnChange}
                    />
                </div>
            ))}

            {mensagem && (
                <div className="mensagem">* {mensagem}</div>
            )}

            <input type="submit" value={submit} />
        </form>
    );
}

export default Form;