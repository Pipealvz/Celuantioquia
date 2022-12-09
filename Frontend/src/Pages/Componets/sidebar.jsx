import React from 'react';
import "../../Css/style.css";

import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/md";
import Logo from '../../Logo.png';
import NavDropdown from 'react-bootstrap/NavDropdown';




const App = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light blue fixed-top">
                <button id="sidebarCollapse" className="btn navbar-btn">
                </button>
                <a className="navbar-brand">
                    <h3 id="logo">CeluAntioquia</h3>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" id="link" to="/">
                                <i className="fas fa-sign-out-alt"></i>
                                Cerrar sesion<span className="sr-only"></span></Link>
                        </li>

                    </ul>
                </div>
            </nav>

            <div className="wrapper fixed-left d-flex"
                style={{ width: '25%' }}>
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <img src={Logo} className=" img-fluid inline-block" style={{ margin: '1rem 2rem', height: '10rem', weight: '10rem' }} alt="..." />
                    </div>

                    <ul className="list-unstyled components">
                        {/* <li>
                            <Link to="/CrearProducto"><FaIcons.MdCreateNewFolder className="me-2" />Crear Producto</Link>
                        </li>
                        <li>
                            <Link to="/NuestrosProductos"><i className="fas fa-clipboard"></i>Nuestros Productos</Link>
                        </li> */}

                        <li>
                            <NavDropdown className="py-2 w-100 d-inline-block option"
                                title="Acciones Productos">
                                <NavDropdown.Item > <Link to="/CrearProducto"><FaIcons.MdCreateNewFolder className="me-2" />Crear Producto</Link> </NavDropdown.Item>
                                <NavDropdown.Item >  <Link to="/NuestrosProductos"><i className="fas fa-clipboard"></i>Nuestros Productos</Link></NavDropdown.Item>

                            </NavDropdown>
                        </li>

                        {/* <li>
                            <Link type="text" to="/CrearProveedor"><FaIcons.MdCreateNewFolder className="me-2" />crear Proveedor</Link>
                        </li>
                        <li>
                            <Link to="/NuestrosProveedores"><i className="fas fa-hands-helping"></i>Nuestros Proveedores</Link>
                        </li> */}

                        <li>
                            <NavDropdown className="py-2 w-100 d-inline-block option"
                                title="Acciones Proveedores">
                                <NavDropdown.Item ><Link type="text" to="/CrearProveedor"><FaIcons.MdCreateNewFolder className="me-2" />crear Proveedor</Link> </NavDropdown.Item>
                                <NavDropdown.Item ><Link to="/NuestrosProveedores"><i className="fas fa-hands-helping"></i>Nuestros Proveedores</Link></NavDropdown.Item>

                            </NavDropdown>
                        </li>

{/* 
                        <li>
                            <Link to="/CrearEmpleado"><FaIcons.MdCreateNewFolder className="me-2" />Crear Empleado</Link>
                        </li>
                        <li>
                            <Link to="/NuestrosEmpleados"><i className="fas fa-info"></i>Nuestros Empleados</Link>
                        </li> */}

                        
                        <li>
                            <NavDropdown className="py-2 w-100 d-inline-block option"
                                title="Acciones Empleados">
                                <NavDropdown.Item > <Link to="/CrearEmpleado"><FaIcons.MdCreateNewFolder className="me-2" />Crear Empleado</Link></NavDropdown.Item>
                                <NavDropdown.Item > <Link to="/NuestrosEmpleados"><i className="fas fa-info"></i>Nuestros Empleados</Link></NavDropdown.Item>

                            </NavDropdown>
                        </li>
                    </ul>
                </nav>

            </div>
        </>

    );

}


export default App;