import Navbar from '../Componets/Navbar';
import React, { memo } from 'react';
import { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
import './Cliente.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Axios } from 'axios';


const ClienteInicio = memo(() => {

    const [post, setPost] = useState(null);

    useEffect(() => {
        getAllProductos();
    }, []);

    if (!post) return null;

    const getAllProductos = () => {
        Axios.post('http://localhost:3306/producto/nuestrosProductos')
            .then((response) => {
                setPost(response.data)
            });
    }

    return (
        <>
            <Navbar />
            <hr>
            </hr>
            <div className='container bg-success vh-100 d-flex p-3'>
                {post.map((item) => {
                    return (
                        <div className="card" id="card-image">
                            <img className="card-img-top" src="https://res.cloudinary.com/dvk7c5rot/image/upload/v1695274321/replit/nnouifjtqvtmedbidcaj.png" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.nombre_producto}</h5>
                                <p className="card-text">{item.descripcion}.</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">An item</li>
                                <li className="list-group-item">A second item</li>
                                <li className="list-group-item">A third item</li>
                            </ul>
                            {/* <div className="card-body">
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </div> */}
                        </div>
                    )
                })}
            </div>
        </>
    );

});

export default ClienteInicio;