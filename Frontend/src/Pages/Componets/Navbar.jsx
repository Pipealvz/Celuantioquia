import React from 'react';
//import { Link } from 'react-router-dom';

//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import * as FaIcons from "react-icons/md";
import  "../../Css/Navbar.css";
import Logo from '../../Logo.png';


function Navbar() {
    return (
        <>
            {[false].map((expand) => (
                <NavBar key={expand} bg="text-light bg-success stylenav" expand={expand} className="mb-3" >
                    <Container fluid>
                        <NavBar.Brand href="#"><h3 className="text-light">CeluAntioquia</h3></NavBar.Brand>
                        <NavBar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <NavBar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <img src={Logo} class=" img-fluid inline-block" style={{ margin: '3rem 6rem', height: '10rem', weight: '10rem' }} alt="..." />
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                <NavDropdown  className="text-success py-2 w-100 d-inline-block option"
                                        title="Nombre Usuario"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                        <NavDropdown.Item href="#action3" className="text-success py-2 w-100 d-inline-block option">Cerrar sesion</NavDropdown.Item>                                      
                                    </NavDropdown>

                                    <Nav.Link href="/CrearProducto" className="text-success py-2 w-100 d-inline-block option" activeClassName="active"><FaIcons.MdCreateNewFolder className="me-2" /> Crear Producto</Nav.Link>
                                    <Nav.Link href="/NuestrosProductos" className="text-success py-2 w-100 d-inline-block option" activeClassName="active"><FaIcons.MdAssignment className="me-2" />Nuestros Productos</Nav.Link>
                                    <Nav.Link href="/CrearEmpleado" className="text-success py-2 w-100 d-inline-block option" activeClassName="active"><FaIcons.MdAssignment className="me-2" />Crear Empleado</Nav.Link>
                                    <Nav.Link href="/NuestrosEmpleados" className="text-success py-2 w-100 d-inline-block option" activeClassName="active"><FaIcons.MdAssignment className="me-2" />Nuestros Empleados</Nav.Link>


                                </Nav>
                            </Offcanvas.Body>
                        </NavBar.Offcanvas>
                    </Container>
                </NavBar>
            ))}
        </>
    );
}

export default Navbar;