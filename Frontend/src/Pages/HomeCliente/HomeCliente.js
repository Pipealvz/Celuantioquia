import Navbar from '../Componets/Navbar';
import React, { memo } from 'react';
import { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Axios from 'axios';
import Loader from '../SpinnerGrow';
import BotonFlotante from './BotonFlotante';

const HomeCliente = () => {

    // const [productos, setProductos] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const getAllProductos = () => {
    //     try {
    //         Axios.post('http://localhost:3306/producto/nuestrosProductos')
    //             .then((response) => {
    //                 setProductos(response.data);
    //                 console.log(response);
    //                 setIsLoading(false);
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getAllProductos();
    // }, []);

    return (
        <>
            {isLoading === true
                ? <Loader /> :
                <div>
                    <Navbar />
                </div>
            }
        </>
    );

};

export default HomeCliente;
