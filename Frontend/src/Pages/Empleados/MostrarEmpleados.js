
import Axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import CrearEmpleado from './CrearEmpleado';
import EditarEmpleado from './EditarEmpleado';
import Navbar from '../Componets/sidebar';
import * as FaIcons from "react-icons/md";
import Swal from 'sweetalert2';
//import SpinnerGrow from '../SpinnerGrow';
import SpinnerBorder from '../SpinnerBorder';



export default function MostrarEmpleados() {

    const [empleados, setEmpleados] = useState();

    const [isLoading, setIsLoading] = useState(true);

    const [datosE, estableceDatos] = useState(null);



    const setDatosEditarEmpleados = (item) => {
        estableceDatos(item);
    }

    const getEmpleados = () => {
        Axios.post('http://localhost:3306/empleado/nuestrosEmpleados')
            .then((response) => {
                setEmpleados(response.data);
                console.log(response.data);
                setIsLoading(false);
            });
    }

    function deleteEmpleado(id) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro?',
            text: "Si se elimina este empleado, no podrá ser recuperado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.post('http://localhost:3306/empleado/eliminarEmpleado', {
                    id_empleado: id
                })
                    .then(() => {
                        swalWithBootstrapButtons.fire({
                            title: 'Realizado',
                            text: "Empleado eliminado!",
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: 'green'
                        }).then(() => {
                            window.location.reload();
                        })
                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: 'Cancelado',
                    text: "No se eliminó ningún empleado",
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'green'
                })
            }
        })
    }

    useEffect(() => {
        getEmpleados();
    }, []);

    return (
        <>
            {
                isLoading === true ?
                    <SpinnerBorder />
                    :
                    <div className='d-flex'>
                        <Navbar />
                        <div className='container vh-auto' style={{ margin: '5rem 0rem 0rem 0rem' }}>
                            <h2 className='text-success text-center text-uppercase fs-1' >Lista de Empleado </h2>
                            <hr />
                            <div className="d-flex mb-3">
                                <form className="d-flex me-1">
                                    <input className="form-control me-2" type="search" placeholder="Buscar empleado..." aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                                </form>
                                <button type="button" className="col-2 btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Registrar Empleado
                                </button>
                            </div>
                            <table className='container table table-hover'>
                                <thead className='bg-success text-light'>
                                    <tr>
                                        <th className='text-center' scope="col">Cód.</th>
                                        <th className='text-start col-2' scope="col">Nombre Empleado</th>
                                        <th scope="col-3">Tipo</th>
                                        <th className='text-start col' scope="col">Documento</th>
                                        <th scope="col">Telefono</th>
                                        <th scope="col">Correo</th>
                                        <th scope="col">Fecha nacimiento</th>
                                        <th scope="col">Aciones</th>
                                    </tr>
                                </thead>
                                {empleados.map((item) => {
                                    return (
                                        <>
                                            <tbody className='text-center text-capitalize' key={item.id_empleado}>
                                                <tr>
                                                    <td className='text-start' id='tdId'>{item.id_empleado}</td>
                                                    <td className='text-start' id='tdName'>{item.nombre_empleado}</td>
                                                    <td className='text-start' id='tdType'>{item.nombre_documento}</td>
                                                    <td className='text-start' id='tdDocument'>{item.documento_identidad}</td>
                                                    <td className='text-end' id='tdTelephone'>{item.telefono_empleado}</td>
                                                    <td className='text-start' id='tdEmail'>{item.correo_empleado}</td>
                                                    <td className='text-end' id='tdDate'>{item.fecha_nacimiento_empleado}</td>
                                                    <td id='tdActions'>
                                                        <div className='d-flex'>
                                                            <button className="btn btn-danger me-1" onClick={() => { deleteEmpleado(item.id_empleado) }} ><FaIcons.MdDelete /> </button>
                                                            <button className="btn btn-warning" id="btn-editEmpleado"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#modal-editEmpleado"
                                                                onClick={() => { setDatosEditarEmpleados(item.id_empleado); }}> <FaIcons.MdModeEdit /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                })}
                            </table>

                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <CrearEmpleado />
                            </div>

                            <EditarEmpleado setDatosEditarEmpleados={datosE} />
                        </div>
                    </div >
            }
        </>
    )
}