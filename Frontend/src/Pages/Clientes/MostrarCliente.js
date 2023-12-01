
import React from 'react';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../Componets/sidebar';
import * as FaIcons from "react-icons/md";
import CrearCliente from './CrearCliente';
import SpinnerBorder from '../SpinnerGrow';
import Swal from 'sweetalert2';


const MostrarCliente = () => {


    const [cliente, setCliente] = useState();
    const [isLoading, setIsLoading] = useState(true);


    // const setDatosEditarEmpleados = (item) => {
    //     estableceDatos(item);
    // }

    const getCliente = () => {
        Axios.post('https://celuantioqueno.onrender.com/cliente/nuestrosClientes')
            .then((response) => {
                setCliente(response.data);
                console.log(response.data);
                setIsLoading(false);
            });
    }

    function deleteCustomer(id) {
        console.log(id)
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro?',
            text: "Si se elimina el cliente, no podrá ser recuperado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.post('https://celuantioqueno.onrender.com/cliente/eliminarCliente', {
                    id_cliente: id
                })
                    .then(() => {
                        swalWithBootstrapButtons.fire({
                            title: 'Eliminado!',
                            text: "El cliente fue eliminado",
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            window.location.reload();
                        })
                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: 'Cancelado',
                    text: "No se eliminó ningún cliente",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }
        })
    }

    useEffect(() => {
        getCliente();
    }, []);

    return (
        <>
            {
                isLoading === true
                    ?
                    <SpinnerBorder />
                    :
                    <div className='d-flex'>
                        <Navbar />
                        <div className='container p-4 vh-auto border rounded shadow' style={{ margin: '8rem 0px 0px 0px' }}>
                            <h2 className='text-success text-center text-uppercase fs-1'>Lista de productos</h2>
                            <hr />
                            <br />
                            <div className="d-flex">
                                <form className="d-flex me-1">
                                    <input className="form-control me-2" type="search" placeholder="Buscar cliente..." aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                                </form>
                                <button type="button" className="col-2 btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Crear Cliente
                                </button>
                            </div>
                            <br />
                            <table className="container table table-hover">
                                <thead className='bg-success'>
                                    <tr className='text-light text-center'>
                                        <th scope="col">Cód.</th>
                                        <th scope="col">Nombre cliente</th>
                                        <th scope="col">Tipo documento</th>
                                        <th scope="col">Número documento</th>
                                        <th scope="col">Telefono</th>
                                        <th scope="col">Correo</th>
                                        <th scope="col">Dirección</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                {cliente.map((item) => {
                                    return (

                                        <tbody className="text-center text-capitalize">
                                            <tr key={item.id_cliente}>
                                                <td >{item.id_cliente}</td>
                                                <td>{item.nombre_cliente} </td>
                                                <td>{item.nombre_documento}</td>
                                                <td>{item.documento_cliente}</td>
                                                <td>{item.telefono_contacto}</td>
                                                <td>{item.correo_cliente}</td>
                                                <td>{item.direccion_vivienda}</td>
                                                <td>
                                                    <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#deleteCustomer" onClick={() => { deleteCustomer(item.id_cliente) }}>
                                                        <span><FaIcons.MdDelete></FaIcons.MdDelete></span>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <CrearCliente />
                        </div>
                    </div>
            }
        </>

    )

}


export default MostrarCliente;