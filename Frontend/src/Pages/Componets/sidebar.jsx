import React from 'react';
import "../../Css/style.css";
import { Link } from 'react-router-dom';
// import * as FaIcons from "react-icons/md";
import Logo from '../../Logo.png';
// import NavDropdown from 'react-bootstrap/NavDropdown';
//import Swal from 'sweetalert2';




const App = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light blue fixed-top">
                <Link to='/' className="navbar-brand">
                    <h3 id="logo">CeluAntioquia</h3>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="btn btn-light text-success" type="button" id="link" to="/">
                                <i className="fas fa-sign-out-alt"></i>
                                Cerrar sesion<span className="sr-only"></span></Link>
                        </li>

                    </ul>
                </div>
            </nav>

            <div className="wrapper fixed-left d-flex vm-100"
                style={{ width: '25%'}}>
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <img src={Logo} className=" img-fluid inline-block" style={{ margin: '1rem 2rem', height: '10rem', weight: '10rem' }} alt="..." />
                    </div>
                    {/* <ul className="list-unstyled components">

                        <li>
                            <NavDropdown className="w-100 d-inline-block option"
                                title="Acciones Productos">
                                <NavDropdown.Item >  <Link to="/NuestrosProductos"><i className="fas fa-clipboard"></i>Nuestros Productos</Link></NavDropdown.Item>
                            </NavDropdown>
                        </li>

                        <li>
                            <NavDropdown className="py-2 w-100 d-inline-block option"
                                title="Acciones Proveedores">
                                <NavDropdown.Item ><Link type="text" to="/CrearProveedor"><FaIcons.MdCreateNewFolder className="me-2" />crear Proveedor</Link> </NavDropdown.Item>
                                <NavDropdown.Item ><Link to="/NuestrosProveedores"><i className="fas fa-hands-helping"></i>Nuestros Proveedores</Link></NavDropdown.Item>

                            </NavDropdown>
                        </li>


                        <li>
                            <NavDropdown className="py-2 w-100 d-inline-block option"
                                title="Acciones Empleados">

                                <NavDropdown.Item > <Link to="/NuestrosEmpleados"><i className="fas fa-info"></i>Nuestros Empleados</Link></NavDropdown.Item>

                            </NavDropdown>
                        </li>

                        <li>
                            <NavDropdown className="py-2 w-100 d-inline-block option"
                                title="Acciones Categoria">
                                <NavDropdown.Item > <Link to="/NuestrasCategorias"><i className="fas fa-info"></i>Nuestros Categoria</Link></NavDropdown.Item>

                            </NavDropdown>
                        </li>

                        <li>
                            <NavDropdown className="py-2 w-100 d-inline-block option"
                                title="Acciones Cliente">
                                <NavDropdown.Item > <Link to="/NuestrosClientes"><i className="fas fa-info"></i>Nuestros Cliente</Link></NavDropdown.Item>

                            </NavDropdown>
                        </li>
                    </ul> */}
                    {/* <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul> */}
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item text-center">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Administración Web
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <Link to="/NuestrosProductos" className='accordion-body btn' id='accordion-body'>Nuestros Productos</Link>
                            </div>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <Link to="/NuestrosEmpleados" className='accordion-body btn' id='accordion-body'>Nuestros Empleados</Link>
                            </div>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <Link to="/NuestrosClientes" className='accordion-body btn' id='accordion-body'>Nuestros Cliente</Link>
                            </div>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <Link to="/NuestrosProveedores" className='accordion-body btn' id='accordion-body'>Nuestros Proveedores</Link>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    Configuración General
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <Link to="/NuestrosRoles" className='accordion-body btn' id='accordion-body'>Nuestros Roles</Link>
                            </div>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <Link to="/NuestrosDocumentos" className='accordion-body btn' id='accordion-body'>Nuestros Documentos</Link>
                            </div>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <Link to="/NuestrasCategorias" className='accordion-body btn' id='accordion-body'>Nuestras Categorías</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </>

    );

}

export default App;