import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

interface Props {
    modal: boolean
    setModal(value: boolean):void
}

const Button = ({modal, setModal}: Props) => {
    const toogleModal = () => {

        setModal(true);
        return;
    }
    
    return (
        <Link to={''} className="new" onClick={() => toogleModal()}>
            <FiPlus color="#FFF" size={25} />
            Novo projeto
        </Link>
    );
}

export default Button;