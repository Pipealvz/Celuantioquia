import Navbar from '../Componets/Navbar';
import React from 'react';
import { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
import './Cliente.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Axios from 'axios';
import Loader from '../SpinnerGrow';
import CardImage from './cardImage';
import BotonFlotante from './BotonFlotante';

const ClienteInicio = () => {

    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState({ title: '', url_image: '' });

    const getAllProductos = () => {
        Axios.post('http://localhost:3306/producto/nuestrosProductos')
            .then((response) => {
                setPost(response.data);
                console.log(response.data);
                setIsLoading(false);
            });
    }
    useEffect(() => {
        getAllProductos();
    }, []);

    const handleUrlImage = (title, url_image) => {
        setUrl({ title, url_image });
    }

    const customMessageWhatsapp = (name) => {
        const names = name;
        const enlaceWhatsapp = `https://wa.me/+573107275678?text=Hola, estoy interesado en el producto *${names}*.
        ¿Tiene disponibilidad en el momento?`;
        window.open(enlaceWhatsapp, '_blank');
    };

    if (!post) return null;


    return (
        <>
            {
                isLoading === true
                    ? <Loader />
                    :
                    <>
                        <Navbar />
                        <div className='fs-1 text-center mt-3 text-uppercase'> ¡Conoce todos nuestros productos!</div>
                        <hr />
                        <div className='m-auto row d-flex w-100 justify-content-between p-3'>
                            {post.map((item) => {
                                return (
                                    <div id='card-product' className="shadow card p-2 mb-3 m-3" key={item.id_producto}>
                                        <img src={item.url_image} className="card-img-top" alt='Cargando...' />
                                        <div className="card-body">
                                            <div className='justify-content-between d-flex'>
                                                <div className="text-break fs-6 fs-bold card-title fw-bold h-50">{item.nombre_producto}</div>
                                                <p className='badge bg-success text-break fs-6'>Disponibles: {item.cantidad}</p>
                                            </div>
                                            <hr />
                                            <p className="card-text text-break">{item.descripcion}</p>
                                            <div className='justify-content-between d-flex text-uppercase'>
                                                <button className="fs-6 btn btn-success col-5" onClick={() => { customMessageWhatsapp(item.nombre_producto) }}>Comprar</button>
                                                <button className="fs-6 btn btn-outline-info col-5" data-bs-toggle="modal" data-bs-target="#cardModalImage" onClick={() => { handleUrlImage(item.nombre_producto, item.url_image) }}>Ver más</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div >
                        <BotonFlotante />
                    </>
            }

            <div className="modal fade" id="cardModalImage" data-bs-backdrop="static" data-bs-keyboard="true"
                tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <CardImage item={url} />
            </div>
        </>
    );

};

export default ClienteInicio;