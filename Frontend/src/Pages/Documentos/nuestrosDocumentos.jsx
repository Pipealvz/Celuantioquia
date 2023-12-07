import Axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import Navbar from '../Componets/sidebar';
import * as FaIcons from "react-icons/md";
import CrearDocumento from "./crearDocumento";
import SpinnerGrow from '../SpinnerGrow';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const NuestrosDocumentos = () => {
    const [post, setPost] = React.useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit } = useForm();

    const [checkForm, setCheckForm] = useState({
        nombre_documento: '',
        estado_documento: ''
    });
    const handleCheckInputs = ({ target }) => {
        setCheckForm({ ...checkForm, [target.name]: target.value });
        console.log(target.value);
    }

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
                            console.log('OK');
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

    const [modalData, setModalData] = React.useState(null);
    const [editShow, setEditShow] = React.useState(false);

    const editarDocumento = (values) => {

        //Se llama el enlace del servicio y se le asignan los valores al 
        //objeto que se con datos ingresasos en el formulario

        Axios.post("https://celuantioqueno.onrender.com/documento/actualizarDocumento", {
            id_documento: modalData.id,
            nombre_documento: values.nombre_documento,
            estado_documento: values.estado_documento
        },
        )
            .then(function (res) {
                console.log(res);
                //             Alerta si se crea el Documento correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "Documento actualizado con exito",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                }).then((res) => {
                    if (res.isConfirmed === true) {
                        console.log('OK');
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                //             Alerta si ocurre algun error al crea el Documento 
                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar el documento",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    };

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
                                                    <td className='text-start' id='tdName'>{item.nombre_documento}</td>
                                                    <td className='text-start' id='tdName'>{item.estado_documento === '0' ? 'Inactivo' : 'Activo'}</td>
                                                    <td id='tdActions'>
                                                        <div className='d-flex'>
                                                            <button className="btn btn-danger me-1" onClick={() => { deleteDocumento(item.id_documento); }} ><FaIcons.MdDelete /> </button>
                                                            <button className="btn btn-warning"  data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => setModalData(item)}> <FaIcons.MdModeEdit /></button>
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
                            </table>
                        </div>
                    </div>
            }

            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog bg-light modal-lg rounded">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className='text-success text-center text-uppercase fs-1'>Editar proveedor</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="producto-form" onSubmit={handleSubmit(editarDocumento)} onChange={handleCheckInputs}>
                                <div className="row text-success d-flex mb-3">
                                    <div className='w-50'>
                                        <label htmlFor="nombre_documento" className="form-label">Nombre documento</label>
                                        <input name="nombre_documento" type="text" className={`form-control ${!checkForm.nombre_documento ? 'is-invalid' : 'is-valid'}`} maxlength="60" id="nombre_documento" value={checkForm.nombre_documento} {...register('nombre_documento', { required: true })} />
                                    </div>
                                    <select className={`w-50 form-control ${!checkForm.estado_documento ? 'is-invalid' : 'is-valid'}`} {...register('estado_documento', { required: true })} >
                                                    <option value='1'>Activo</option>
                                                    <option value='0'>Inactivo</option>
                                    </select>
                                </div>
                                <div className="text-center">
                                    <input type="submit" value="Actualizar" className="btn btn-success mt-4 w-50" />
                                </div>
                                <br />
                            </form>
                        </div>
                    </div >
                </div >
            </div>

            <Modal show={editShow}
                onHide={() => setEditShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar producto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(editarDocumento)}>
                        <label htmlFor="proveedor" className="form-label" >Proveedor</label>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre del proveedor</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Samsung..."
                                // value={modalData.nombre_producto}
                                autoFocus
                                {...register('nombre_documento', { required: true })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Correo Proveedor</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Example@gmail.com"
                                //value={modalData.estado_documento}
                                autoFocus
                                {...register('correo_proveedor', { required: true })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Contacto</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="50"
                                // value={modalData.cantidad}
                                autoFocus
                                {...register('contacto_proveedor', { required: true })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Nit</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="50"
                                // value={modalData.precio}
                                autoFocus
                                {...register('nit_proveedor', { required: true })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                // value={modalData.descripcion}
                                {...register('direccion_proveedor', { required: true })}
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="success" onClick={() => setEditShow(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="success" >
                                Guardar cambios
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NuestrosDocumentos;