import React, { ChangeEvent, useContext, useEffect, useState } from "react";

// CSS
import './Modal.css';

// Icons
import { FiPlus } from "react-icons/fi";

// Context
import { AuthContext } from "../../../Context/aurh";

// API
import { api } from "../../../utils/api";
import { toast } from "react-toastify";

interface Props {
    projectEdit: any
    text: string
    setModal(value: boolean):void
    setText(value:string):void
    textInput: string
    setTextInput(value:string):void
}

const Modal = ({projectEdit, text, setText, setModal, textInput, setTextInput}: Props) => {
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('Aberto');
    const {user}: any = useContext(AuthContext);

    useEffect(() => {
        setName(projectEdit.name? projectEdit.name : '')
        setStatus(projectEdit.status? projectEdit.status : '')
    },[])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        console.log(projectEdit)
    }

    const handleChengeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    }

    const closeModal = () => {
        setModal(false);
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        api.defaults.headers.Authorization = `Bearer ${user.token}`;

        if(text == "Novo Projeto") {
            api.post('/api/projects/new', {
                name: name,
                status: status
            })
            .then(res => {
                setModal(false);
                toast.success('Projeto criado com sucesso')
                setText('Novo Projeto');
            })
            .catch(error => toast.error('Erro ao criar projeto'))

            setText('Novo Projeto');

            return;
        }

        api.patch(`/api/projects/update/${projectEdit.id}`, {
            name: name,
            status: status
        })
        .then(res => {
            setModal(false);
            toast.success('Projeto editado com sucesso')
            setText('Novo Projeto');
        })
        .catch(error => toast.error(error.response.data.message))
    }


    return (
        <div>
            <div className="area-externa" onClick={closeModal}></div>
            <div className="modal">
                <div className="title modal-title">
                    <FiPlus 
                        size={25}
                        color="#000"
                    /> 
                    <span>{text}</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nome do projeto</label>
                    <input 
                        type="text" 
                        placeholder="DIgite o nome do projeto"
                        value={name}
                        onChange={handleOnChange}
                    />

                    <label htmlFor="status">Status</label>
                    <select name="status" value={status} id="status" onChange={handleChengeSelect}>
                        <option value="Aberto">Aberto</option>
                        <option value="Terminado">Terminado</option>
                    </select>

                    <input type="submit" value={textInput} />
                </form>
            </div>
        </div>
    );
}

export default Modal;