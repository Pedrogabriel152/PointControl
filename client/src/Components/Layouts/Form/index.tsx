import React from "react";

// Icons
import { RxAvatar } from 'react-icons/rx';

interface Form {
    inputs: any
    submit: string
}

const Form = ({inputs, submit}: Form) => {
    return (
        <form>
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

            <input type="submit" value={submit} />
        </form>
    );
}

export default Form;