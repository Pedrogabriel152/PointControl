import React, { ChangeEvent, useContext, useEffect, useState } from "react";

// CSS
import './Profile.css';

// Layouts
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";

// Icons
import { FaClipboardList } from "react-icons/fa";
import { FiSettings, FiUpload } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";

// API
import { api } from "../../../utils/api";

// Context
import { AuthContext } from "../../../Context/aurh";
import { toast } from "react-toastify";

const Profile = () => {

    const [userUpdate, setUserUpdate] = useState<any>({});
    const [image, setImage] = useState<any>(null);
    const {user}: any = useContext(AuthContext);

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${user.token}`;

        api.get(`/api/users/edit`)
        .then(res => setUserUpdate(res.data))
        .catch(error => console.log(error))
    }, [])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserUpdate({...userUpdate, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        api.defaults.headers.Authorization = `Bearer ${user.token}`;

        api.post(`/api/users/update`, {
            name: userUpdate.name,
            email: userUpdate.email,
            image: image,
            valor_hora: userUpdate.valor_hora
        },{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            toast.success(res.data.message);
        })
        .catch(error => {
            toast.error(error.response.data.message)
        })
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type=== 'image/png') {
                setImage(image);
            }
            else{
                alert("Mande uma imagem do tipo PNG ou JPEG");
                setImage(null);
                return;
            } 
        }
    }

    return (
        <div>
            <Header />

            <main>
                <div className="title">
                    <FiSettings 
                        size={25}
                        color="#000"
                    /> 
                    <span>Minha Conta</span>
                </div>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>

                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25} className="avatar"/>
                            </span>

                            {!image
                                ? userUpdate.image 
                                    ? <img src={`http://127.0.0.1:8000/img/users/${userUpdate.id}/${userUpdate.image}`} alt="Foto de perfil" width={250} height={250} className="image"/>
                                    : <RxAvatar size={90} className="image"/>
                                : <img src={URL.createObjectURL(image)} alt="Foto de perfil" width={250} height={250}/>
                            }
                            
                            <input type="file" accept="image/*" onChange={handleFile} className="first" /><br />
                            

                        </label>

                        <label htmlFor="name">Nome:</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Seu nome" 
                            value={userUpdate.name? userUpdate.name : ''} 
                            onChange={handleOnChange}
                        />

                        <label htmlFor="valor_hora">Valor Hora:</label>
                        <input 
                            type="number" 
                            name="valor_hora" 
                            placeholder="Seu e-mail" 
                            value={userUpdate.valor_hora? userUpdate.valor_hora : ''}
                        />

                        <label htmlFor="email">E-mail:</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Seu e-mail" 
                            value={userUpdate.email? userUpdate.email : ''}
                            disabled={true}
                        />

                        <input type="submit" value={'Salvar'}/>

                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Profile;