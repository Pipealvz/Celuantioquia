
import Axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import CrearEmpleado from './CrearEmpleado';
import EditarEmpleado from './EditarEmpleado';
import Navbar from '../Componets/sidebar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as FaIcons from "react-icons/md";



export default function  MostrarEmpleados  () {

    const [empleados, setEmpleados] = useState();

    const [deleteShow, setDeletehow] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);
    const [ datosE, estableceDatos] = useState(null);



    const setDatosEditarEmpleados = (item) => {
        estableceDatos(item);
    }

    const getEmpleados = () => {
        Axios.post('https://celuantioqueno.onrender.com/empleado/nuestrosEmpleados')
            .then((response) => {
                setEmpleados(response.data);
                console.log(response.data);
            });
    }

    function deleteEmpleado(id) {
        Axios.post('https://celuantioqueno.onrender.com/empleado/eliminarEmpleado', {
            id_empleado: id
        })
            .then(() => {
                window.location.reload(true);
            });
    }

    useEffect(() => {
        getEmpleados();
    }, []);

    if (!empleados) return null;

    return (
        <div className='d-flex'>
            <Navbar />

            <div className='container p-4 vh-auto border rounded shadow' style={{ margin: '5rem 4rem 5rem 4rem' }}>

                <h2 className='text-success text-center text-uppercase fs-1' >Lista de Empleado </h2>

                <div className="container">
                    <div className="row-fluid mt-4 justify-content-center d-flex">
                        <div
                            id="btn-crelote"
                            className="btn btn-success col-lg-4 col-12"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-empleado"
                            style={{ marginBottom: '1rem' }}
                        >
                            Agregar empleado
                        </div>
                    </div>
                </div>
                <table className="table text-success">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre Empleado</th>
                            <th scope="col">Tipo Documento</th>
                            <th scope="col">Documento</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Cumpleaños</th>
                            <th scope="col">aciones</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider ">

                        {empleados.map((item) => {
                            return (

                                <tr className="table-light text-success ">
                                    <th scope="row" key={item.id_empleado}></th>
                                    <td>{item.nombre_empleado} </td>
                                    <td>{item.tipo_documento}</td>
                                    <td>{item.documento_identidad}</td>
                                    <td>{item.telefono_empleado}</td>
                                    <td>{item.correo_empleado}</td>
                                    <td>{item.fecha_nacimiento_empleado}</td>
                                    <td>
                                        <div className="row d-flex">
                                            <div
                                                id="btn-editEmpleado"
                                                className="btn btn-outline-success  col-5"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modal-editEmpleado"
                                                onClick={() => { setDatosEditarEmpleados(item.id_empleado); }}
                                            >
                                                <FaIcons.MdModeEdit className="" />
                                            </div>
                                            
                                            <Button variant="outline-success" style={{ margin: '1rem', width: 'auto' }} onClick={() => { setModalData(item); setDeletehow(true); }} ><FaIcons.MdDelete className="" /></Button>
                                        </div>
                                    </td>

                                </tr>
                            )

                        })}
                    </tbody> 
                </table>
                
                <EditarEmpleado setDatosEditarEmpleados={datosE} />
                <Modal
                    show={deleteShow}
                    onHide={() => setDeletehow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Advertencia
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Estas seguro de queres eliminar este producto?</Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={() => setDeletehow(false)}>
                            No
                        </Button>
                        <Button variant="success" onClick={() => { deleteEmpleado(modalData.id_empleado) }}>
                            si
                        </Button>
                    </Modal.Footer>
                </Modal>

                

                <CrearEmpleado />
            </div>
        </div>
    )

}