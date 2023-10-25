import Navbar from '../Componets/Navbar';
import React, { memo } from 'react';
import { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Axios } from 'axios';

const HomeCliente = memo(() => {

    const [productos, setProductos] = useState();


    const getAllProductos = () => {
        Axios.post('http://localhost:3306/producto/nuestrosProductos')
            .then((response) => {
                setProductos(response.data)
                console.log(response);
            });
    }

    useEffect(() => {
        getAllProductos();
    }, []);

    useEffect(() => {
        // Realiza la solicitud a la API aquí
        fetch('URL_DE_LA_API')
            .then((response) => response.json())
            .then((data) => {
                // Aplica el filtro a los datos recibidos
                const productosFiltrados = data.filter((producto) => producto.precio > filterFavorite);

                // Establece los datos filtrados en el estado del componente
                setProductos(productosFiltrados);
            })
            .catch((error) => {
                console.error('Error al obtener datos de la API:', error);
            });
    }, [filterFavorite]);

    const settings = {
        infinite: true, // Carrusel infinito
        slidesToShow: 3, // Cantidad de productos a mostrar en cada slide
        slidesToScroll: 1, // Cantidad de productos a mover al hacer clic en las flechas de navegación
    };

    return (
        <div>
            <Navbar />
            <div style={{
                background: '#D1E7DD',
                padding: '2rem',
                margin: '4rem',
                borderRadius: '5rem'
            }}>
                <section
                    className="page-header py-5 py-md-0"
                    style={{
                        backgroundImage: "url(https://i.pinimg.com/originals/ab/ae/be/abaebe13ccbca48c8561cd573e7bf947.jpg)",
                        backgroundSize: "contain",
                        borderRadius: "1rem",
                        minHeight: "80vh",
                        opacity: '0.6',
                        backgroundColor: 'gray'

                    }}
                >
                    <span className="mask bg-gradient-dark opacity-7"></span>
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={8} sm={9} className="text-center mx-auto">
                                <h1 className="text-light mb-4">Check out our new collection</h1>
                                <p className="lead text-light mb-sm-6 mb-4">Mantente conectado y en la cima de la productividad con nuestros celulares inteligentes. Accede a tus aplicaciones favoritas, administra tus tareas y mantén tus comunicaciones al día, todo desde la comodidad de tu dispositivo móvil.</p>
                                <Button variant="light" className="m-3" size="lg">Mas..</Button>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <Container className="my-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>Categorias</h4>
                    </div>
                    <Row className="mb-5">
                        <Col md={6} lg={3}>
                            <Link href="#">
                                <Card className="card card-background align-items-start mb-4 mb-lg-0 undefined">

                                    <Card.Body className="card-body text-center w-100 pt-8">
                                        <div className="d-block mt-8">
                                            <h4 className="text-black">Celulares</h4>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link href="#">
                                <div className="card card-background align-items-start mb-4 mb-lg-0 undefined">

                                    <div className="card-body text-center w-100 pt-8">
                                        <div className="d-block mt-8">
                                            <h4 className="text-black">Audifonos</h4>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link href="#">
                                <div className="card card-background align-items-start mb-4 mb-lg-0 undefined">

                                    <div className="card-body text-center w-100 pt-8">
                                        <div className="d-block mt-8">
                                            <h4 className="text-black">Accesorios</h4>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link href="#">
                                <div className="card card-background align-items-start mb-4 mb-lg-0 undefined">

                                    <div className="card-body text-center w-100 pt-8">
                                        <div className="d-block mt-8">
                                            <h4 className="text-black">Tabletas</h4>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    </Row>

                    <section
                        className="page-header py-5 py-md-0"
                        style={{
                            backgroundImage: "url(https://i.pinimg.com/550x/bc/20/7c/bc207cb9ba56ef9daa02aa37f319db2d.jpg)",
                            minHeight: "50vh",
                            borderRadius: "1rem",
                        }}
                    >
                        <span className="mask bg-gradient-dark opacity-7"></span>
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={8} sm={9} className="text-center mx-auto">
                                    <h1 className="text-white mb-4">iPhone</h1>
                                    <p className="lead text-white mb-sm-6 mb-4">The Basic Starter Pack allows you to fully express your vibrant personality with four grayscale options. Feeling adventurous? Put on a heather gray shirt. Want to be a trendsetter? Try our exclusive colorway: `Orange`. Need to add an extra pop of color to your outfit? Our white shirt has you covered.</p>
                                    <Button variant="white" className="btn btn-white btn-lg">Show new arrivals</Button>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </Container>
            </div>

            <div className="carrusel-destacado">
                <h2>Productos Destacados</h2>
                <Slider {...settings}>
                    {productos.map((producto) => (
                        <div key={producto.id_producto} className="producto">
                            <h3>{producto.nombre}</h3>
                            <p>{producto.precio}</p>
                            <p>{producto.descripcion}</p>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    );

});

export default HomeCliente;