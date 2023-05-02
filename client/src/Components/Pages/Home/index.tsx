import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// CSS
import './Home.css';

// Grafico
import Chart from "react-apexcharts";

// Layouts
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";

// Context
import { AuthContext } from "../../../Context/aurh";

// API
import { api } from "../../../utils/api";
import ReactApexChart from "react-apexcharts";


const Home = () => {
    const [projectsRecents, setPorjectsRecents] = useState<any>([]);
    const [projectsHours, setProjectsHours] = useState<any>({});
    const [projectsPrice, setProjectsPrice] = useState<any>([]);
    const { user, loading }: any = useContext(AuthContext);
    const [series, setSeries] = useState<any>([]);
    const [labels, setLabels] = useState<any>([]);
    const navigate = useNavigate();

    const options: any = {
        chart: {
            width: 350,
            type: 'donut'
        },
        labels,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'right',
                    offsetY: 0,
                }
            }
        }]
    }

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${user.token}`;

        const getProjects = () => {
            api.get('/api/projects/recent')
            .then(res => {
                setPorjectsRecents(res.data);
            })
            .catch(error => {
                setPorjectsRecents([]);
            })
        }

        getProjects();
    }, []);

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${user.token}`;

        const getProjectsHours = () => {
            api.get('/api/projects/hours')
            .then(res => {
                setProjectsHours(res.data);
                options.labels = [];
                let series:any = [];

                res.data.projects.forEach((project: any) => {
                    options.labels = [...options.labels, project.name];
                    series.push(parseInt(project.horas_gastas))
                });

                setSeries(series);
                setLabels(options.labels);
            })
            .catch(error => {
                setProjectsHours([]);
            })
        }

        getProjectsHours();
    }, [])

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${user.token}`;

        api.get('/api/projects/price')
        .then(res => {
            setProjectsPrice(res.data)
        })
        .catch(error => {
            setProjectsPrice([]);
        })

    }, [])

    if(loading){
        return <div></div>;
    }

    if(!loading && !user){
        navigate('/');
        return (
            <>

            </>
        );
    }

    return (
        <div>
            <Header />
            <main>
                <div className="recents">
                    <h3>Projetos Recentes</h3>

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Projeto</th>
                                <th scope="col">Adicionado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectsRecents.map((project: any) => {
                                const date = new Date(project.created_at)
                                const data = `${date.getDate().toString().padStart(2,'0')}/${String(date.getMonth() + 1).padStart(2,'0')}/${date.getFullYear()}`

                                const name = project.name[0].toUpperCase()+project.name.substr(1);

                                return (
                                    <tr key={project.id}>
                                        <td data-label="Projeto">{name}</td>
                                        <td data-label="Adicionado">{data}</td>
                                    </tr>
                                );
                            })}     
                        </tbody>
                    </table>
                </div>

                <div className="mediahours">
                    <h3>Horas Total Trabalhadas</h3>

                    <h1>{projectsHours.horas}</h1>
                </div>

                <div className="totalhours">
                    <h3>Médias de Horas Trabalhadas</h3>

                    <h1>{projectsHours.media? parseInt(projectsHours.media).toString(): 0}</h1>

                </div>

                <div className="rowBottom">
                    <h3>Horas Por Projeto</h3>

                    <div className="grafico">
                        <ReactApexChart 
                            options={options} 
                            series={series} 
                            type="donut" width={380} 
                        />

                    </div>
                </div>

                <div className="rowBottom price">
                    <h3>Custo Por Projeto</h3>

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Projeto</th>
                                <th scope="col">Custo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectsPrice.map((project: any) => {

                                const name = project.name[0].toUpperCase()+project.name.substr(1);

                                return (
                                    <tr key={project.id}>
                                        <td data-label="Projeto">{name}</td>
                                        <td data-label="Custo">{project.custo}</td>
                                    </tr>
                                );
                            })}     
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;