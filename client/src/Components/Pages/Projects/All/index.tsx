import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// CSS
import '../Projects.css';

// Layouts
import Header from "../../../Layouts/Header";
import Footer from "../../../Layouts/Footer";
import Button from "../../../Layouts/Buttom";
import Modal from "../../../Layouts/Modal";
import Icons from "../../../Layouts/Icons";

// Icons
import { FaClipboardList } from 'react-icons/fa';

// API
import { api } from "../../../../utils/api";

// Context
import { AuthContext } from "../../../../Context/aurh";
import Paginate from "../../../Layouts/Paginate";

// Toastify
import { toast } from "react-toastify";

const All = () => {
    const [projects, setProjects] = useState<any>('');
    const {user, loading}: any = useContext(AuthContext);
    const [page, setPage] = useState<any>();
    const [loadingCheck, setLoadingCheck] = useState<boolean>(true);
    const [modal, setModal] = useState<boolean>(false);
    const [text, setText] = useState<string>('Novo Projeto');
    const [textInput, setTextInput] = useState<string>('Cadastrar');
    const [projectEdit, setProjectEdit] = useState<any>('');
    const navigate = useNavigate();

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${user.token}`;

        api.get('/api/projects')
        .then(res => {
            setProjects(res.data);
            setPage(res.data.current_page);
            setLoadingCheck(false);
        })
        .catch(error => {
            setProjects('');
            if(error.response.status == 401){
                navigate('/');
                setLoadingCheck(false);
            }
        })
    }, []) 

    const clockIn = (id: number, acao: string) => {
        api.defaults.headers.Authorization = `Bearer ${user.token}`;

        api.patch(`/api/projects/clockin/${id}?acao=${acao}`)
        .then(res => {
            navigate('/projects')
            toast.success(res.data.message);
            setLoadingCheck(false);
        })
        .catch(error => {
            toast.error(error)
            if(error.response.status == 401){
                navigate('/');
                setLoadingCheck(false);
            }
        })
    }

    if(loading){
        return <div></div>;
    }

    if(loadingCheck) {
        return <div></div>;
    }

    if(!loading && !user){
        navigate('/');
        return (
            <>

            </>
        );
    }

    return(
        <div>
            <Header />

            <main>
                <div className="title">
                    <FaClipboardList 
                        size={25}
                        color="#000"
                    /> 
                    <span>Projetos</span>
                </div>

                {!projects
                    ? (
                        <div className="dashboard">
                            <span>Nenhum projeto encontrado...</span>
                            <Button 
                                modal={modal} 
                                setModal={setModal} 
                                setTextInput={setTextInput} 
                                setText={setText}
                            />
                        </div>
                    ) : (
                        <>
                            <Button 
                                modal={modal} 
                                setModal={setModal} 
                                setTextInput={setTextInput} 
                                setText={setText}
                            />
                            <div className="projects">
                                <Link to={'/projects'} className="active">
                                    Projetos 
                                </Link>
                                <Link to={'/projects/open'}>
                                    Projetos Abertos
                                </Link>
                                <Link to={'/projects/close'}>
                                    Projetos Fechados
                                </Link>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Projeto</th>
                                        <th scope="col">Horas Gastas</th>
                                        <th scope="col">Criação</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Custo</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project: any) => {
                                        const date = new Date(project.created_at)
                                        const data = `${date.getDate().toString().padStart(2,'0')}/${String(date.getMonth() + 1).padStart(2,'0')}/${date.getFullYear()}`

                                        const name = project.name[0].toUpperCase()+project.name.substr(1);

                                        const horas = project.horas_gastas.split(':')

                                        return (
                                            <tr key={project.id}>
                                                <td data-label="Projeto">{name}</td>
                                                <td data-label="Horas Gastas">{horas.length === 2
                                                    ? horas[1].length == 1 ? `${horas[0]}:0${horas[1]}`:`${horas[0]}:${horas[1]}`
                                                    : `${project.horas_gastas}`
                                                }</td>
                                                <td data-label="Criação">{data}</td>
                                                <td data-label="Status">{project.status}</td>
                                                <td data-label="Custo">{project.custo}</td>
                                                <td data-label="#">
                                                    <Icons 
                                                        clockIn={clockIn} 
                                                        project={project}
                                                        setModal={setModal}
                                                        setText={setText}
                                                        setTextInput={setTextInput}
                                                        setProjectEdit={setProjectEdit}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}     
                                </tbody>
                            </table>
                            {projects.last_page && (
                                <Paginate 
                                    last_page={projects.last_page}
                                    limit={10}
                                    page={page}
                                    setPage={setPage}
                                />
                            )}

                            {modal && (
                                <Modal 
                                text={text} 
                                setText={setText} 
                                setModal={setModal} 
                                textInput={textInput}
                                setTextInput={setTextInput} 
                                projectEdit={projectEdit}   
                            />
                            )}
                        </>
                    )
                }
            </main>

            <Footer />
        </div>
    );
}

export default All;