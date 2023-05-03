import React, { useContext } from "react";

// Icons
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { BsFillPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs';
import { GiConfirmed } from 'react-icons/gi';
import { RxLockOpen2 } from "react-icons/rx";

// Context
import { AuthContext } from "../../../Context/aurh";

// API
import { api } from "../../../utils/api";

// Toastify
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
    project: any
    clockIn(id:number, acao: string):void
    setText(value:string):void
    setModal(value:boolean):void
    setTextInput(value: string):void
}

const Icons = ({project, clockIn, setText, setModal, setTextInput}:Props) => {
    const {user} : any = useContext(AuthContext);
    const navigate = useNavigate();

    const updateStatus = () => {
        api.defaults.headers.Authorization = `Bearer ${user.token}`;

        api.patch(`/api/projects/update/status/${project.id}`)
        .then(res => {
            toast.success(res.data.message);
            navigate('/projects');
        })
        .catch(error => {
            toast.error('Error ao atualizar o status');
        })
    }

    const deleteProject = () => {
        api.defaults.headers.Authorization = `Bearer ${user.token}`;

        api.delete(`/api/projects/delete/${project.id}`)
        .then(res => {
            toast.success(res.data.message);
            navigate('/projects');
        })
        .catch(error => {
            toast.error(error.response.data.message);
        })
    }

    const modalEdit = () => {
        setTextInput('Salvar');
        setText('Editar Projeto');
        setModal(true);
    }

    return (
        <>
            {project.status == "Terminado"
                ? <i onClick={updateStatus}><RxLockOpen2 size={20}/></i> 
                : <i onClick={updateStatus}><GiConfirmed size={20}/></i>
            }
            {project.status != "Terminado" && (
                project.status == "Iniciado" 
                ? <i onClick={() => clockIn(project.id, 'close')}><BsPauseCircleFill size={20}/></i>
                : <i onClick={() => clockIn(project.id, 'open')}><BsFillPlayCircleFill size={20}/></i>
                
            )}
            <i onClick={modalEdit}><GrEdit size={20}/></i>
            <i onClick={deleteProject}><RiDeleteBin5Fill size={20}/></i>
        </>
    );
}

export default Icons;