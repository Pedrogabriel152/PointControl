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
    const { user, loading }: any = useContext(AuthContext);
    const navigate = useNavigate();

    const options: any = {
        chart: {
            chart: {
              height: 350,
              type: 'radialBar',
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  size: '70%',
                }
              },
            },
            labels: ['Cricket'],
          },
      }

    const series: any = [70]

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
                console.log(res.data)
                setProjectsHours(res.data);
            })
            .catch(error => {
                setProjectsHours([]);
            })
        }

        getProjectsHours();
    }, [])

    useEffect(() => {

        var options = {
            chart: {
                width: 380,
                type: 'donut'
            },
            dataLabels: {
                enabled: false
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    show: false
                  }
                }
              }],
              legend: {
                position: 'right',
                offsetY: 0,
                height: 230,
              }
          }
          
          var chart = new ApexCharts(document.querySelector("#chart"), options);
          
          chart.render();

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
                    <h3>Horas Total Trabalhadas</h3>

                    <div>
                    <ReactApexChart 
                        options={options} 
                        series={series} 
                        type="radialBar" width={380} 
                    />

                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;