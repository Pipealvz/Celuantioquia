import React from 'react';
//import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import Logo from '../../Logo.png';
import "../../Css/Navbar.css";



function NavbarHome() {
    return (
        <>
            <div  className="shadow shadowNav" >
                <Navbar collapseOnSelect expand="lg" bg="light" color='success'>
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                src={Logo}
                                width="80"
                                height="80"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />{' '}
                            <h4 className="d-inline-block pt-4 text-success" >Celuantioquia</h4>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#features" className="fs-5">Catalogo</Nav.Link>
                                <Nav.Link href="#pricing" className="fs-5">Pricing</Nav.Link>
                            </Nav>
                            <Nav>
                                <Button variant="outline-success" className="m-3" size="lg">Iniciar sesion</Button>
                                <Button variant="success" className="m-3" size="lg">Registrarse</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Navbar collapseOnSelect expand="lg" bg="light" color='success' style={{padding:'0px'}}>                    
                        <ListGroup horizontal className='container-fluid  list-group-flush'  style={{padding:'0px'}} >
                            <ListGroup.Item action variant="success">This</ListGroup.Item>
                            <ListGroup.Item action variant="success">ListGroup</ListGroup.Item>
                            <ListGroup.Item action variant="success">renders</ListGroup.Item>
                            <ListGroup.Item action variant="success">horizontally!</ListGroup.Item>
                            <ListGroup.Item action variant="success">horizontally!</ListGroup.Item>
                            <ListGroup.Item action variant="success">horizontally!</ListGroup.Item>
                            <ListGroup.Item action variant="success">horizontally!</ListGroup.Item>
                            <ListGroup.Item action variant="success">horizontally!</ListGroup.Item>
                            <ListGroup.Item action variant="success">horizontally!</ListGroup.Item>
                        </ListGroup>               
                </Navbar>
            </div>
        </>
    
    );
}

export default NavbarHome;