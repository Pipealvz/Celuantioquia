import Axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import Navbar from '../Componets/sidebar';
import * as FaIcons from "react-icons/md";
import CrearDocumento from "./crearDocumento";
import SpinnerGrow from '../SpinnerGrow';

const NuestrosDocumentos = () => {
    const [post, setPost] = React.useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getDocumentos = () => {
        Axios.post('https://celuantioqueno.onrender.com/documento/nuestrosDocumentos')
            .then((response) => {
                setPost(response.data);
                setIsLoading(false);
            });
    }

    function deleteDocumento(id) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro?',
            text: "Si se elimina el documento, no podrá ser recuperado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.post('https://celuantioqueno.onrender.com/documento/eliminarDocumento', {
                    id_documento: id
                })
                    .then(() => {
                        swalWithBootstrapButtons.fire({
                            title: 'Eliminado!',
                            text: "El documento fue eliminado",
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
                    text: "No se eliminó ningún documento",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }
        })
    }

    useEffect(() => {
        getDocumentos();
    }, []);
    return (
        <>
            {
                isLoading === true ?
                    <SpinnerGrow />
                    :
                    <div className='d-flex'>
                        <Navbar />
                        <div className='container' style={{ margin: '8rem 0px 0px 0px' }}>
                            <h2 className='text-success text-center text-uppercase fs-1'>Lista de documentos</h2>
                            <hr />
                            <br />
                            <div className="d-flex">
                                <form className="d-flex me-1">
                                    <input className="form-control me-2" type="search" placeholder="Buscar tipo de documento..." aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                                </form>
                                <button type="button" className="col-3 btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Crear Tipo documento
                                </button>
                            </div>
                            <br />
                            <table className='container table table-hover'>
                                <thead className='bg-success'>
                                    <tr className='text-light text-center'>
                                        <th className='text-center' scope="col">Tipo de documento</th>
                                        <th className='text-start col-2' scope="col">Estado</th>
                                        <th className='text-start col-2' scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                {post.map((item) => {

                                    return (
                                        <>
                                            <tbody className='text-center text-capitalize' key={item.id_documento}>
                                                <tr>
                                                    <td className='text-center' id='tdName'>{item.nombre_documento}</td>
                                                    <td className='text-start' id='tdName'>{item.estado_documento === '0' ? 'Inactivo' : 'Activo'}</td>
                                                    <td id='tdActions'>
                                                        <div className='d-flex'>
                                                            <button className="btn btn-danger me-1" onClick={() => { deleteDocumento(item.id_documento); }} ><FaIcons.MdDelete /> </button>
                                                            <button className="btn btn-warning" dissabled data-bs-toggle="modal" data-bs-target="#exampleModal2"> <FaIcons.MdModeEdit /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                })}

                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <CrearDocumento />
                                </div>

                                {/* <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                    <EditarProducto />
                                </div> */}
                            </table>
                        </div>
                    </div>
            }
        </>
    )
}

export default NuestrosDocumentos;