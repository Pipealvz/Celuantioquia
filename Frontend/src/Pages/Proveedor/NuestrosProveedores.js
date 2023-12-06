import Axios from 'axios';
import React, { memo, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"
//import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Navbar from '../Componets/sidebar';
import * as FaIcons from "react-icons/md";
import CrearProveedor from './CrearProveedor';
import SpinnerGrow from '../SpinnerGrow';




const NuestrosProveedores = memo(() => {


    const [post, setPost] = React.useState(null);
    const [modalData, setModalData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const [editShow, setEditShow] = React.useState(false);

    const { register, handleSubmit } = useForm();

    const [checkForm, setCheckForm] = useState({
        nombre_proveedor: '',
        correo_proveedor: '',
        contacto_proveedor: '',
        nit_proveedor: '',
        direccion_proveedor: ''
    });

    React.useEffect(() => {
        getAllProveedor();
    }, []);

    const handleCheckInputs = ({ target }) => {
        setCheckForm({ ...checkForm, [target.name]: target.value });
        console.log(target.value);
    }

    const getAllProveedor = () => {
        Axios.post('https://celuantioqueno.onrender.com/proveedor/nuestrosProveedores')
            .then((response) => {
                setPost(response.data)
                setIsLoading(false);
            });
    }

    const editProveedor = values => {
        Axios.post('https://celuantioqueno.onrender.com/proveedor/actualizarProveedor', {
            id_proveedor: modalData.id_proveedor,
            nombre_proveedor: values.nombre_proveedor,
            correo_proveedor: values.correo_proveedor,
            contacto_proveedor: values.contacto_proveedor,
            nit_proveedor: values.nit_proveedor,
            direccion_proveedor: values.direccion_proveedor
        })
            .then(function (res) {
                console.log(res);
                //             Alerta si se crea el proveedor correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "Proveedor actualizado con exito",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                }).then((res) => {
                    if (res.isConfirmed === true) {
                        window.location.reload(true);
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                //             Alerta si ocurre algun error al crea el proveedor 
                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar el proveedor",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    }

    function deleteProveedor(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro?',
            text: "Si se elimina el proveedor, no podrá ser recuperado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.post('https://celuantioqueno.onrender.com/proveedor/eliminarProveedores', { id_proveedor: id })
                    .then(() => {
                        swalWithBootstrapButtons.fire(
                            'Eliminado',
                            'El proveedor fue eliminado',
                            'success'
                        ).then(() => {
                            window.location.reload();
                        })
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'No se eliminó ningún proveedor',
                    'error'
                )
            }
        }).catch((err) => {
            if (err.response && err.response.status === 400) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'El proveedor fue usado en otro formulario',
                    'error'
                )
            }
        })
    }

    if (!post) return null;
    return (
        <>
            {
                isLoading === true ? <SpinnerGrow /> :
                    <div className='d-flex'>
                        <Navbar />
                        <div className='container' style={{ margin: '8rem 0rem 0rem 0rem' }}>

                            <h2 className='text-success text-center text-uppercase fs-1'>Proveedores</h2>
                            <br />
                            <div className="d-flex">
                                <form className="d-flex me-1">
                                    <input className="form-control me-2" type="search" placeholder="Buscar cliente..." aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                                </form>
                                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Crear proveedor
                                </button>
                            </div>
                            <br />
                            <table className="container table table-hover">
                                <thead className='bg-success'>
                                    <tr className='text-light text-center'>
                                        <th scope="col">Cód.</th>
                                        <th scope="col">Nombre Proveedor</th>
                                        <th scope="col">Correo Proveedor</th>
                                        <th scope="col">Contacto</th>
                                        <th scope="col">Nit</th>
                                        <th scope="col">Dirección</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center text-capitalize">
                                    {post.map((item) => {
                                        return (
                                            <tr key={item.id_proveedor}>
                                                <td scope="row">{item.id_proveedor}</td>
                                                <td>{item.nombre_proveedor}</td>
                                                <td>{item.correo_proveedor}</td>
                                                <td>{item.contacto_proveedor}</td>
                                                <td>{item.nit_proveedor}</td>
                                                <td>{item.direccion_proveedor}</td>
                                                <td>
                                                    <div className='d-flex'>
                                                        <button className="btn btn-danger me-1" onClick={() => { deleteProveedor(item.id_proveedor); }} ><FaIcons.MdDelete className="" /></button>
                                                        <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { setModalData(item) }}><FaIcons.MdModeEdit className="" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <CrearProveedor />
                            </div>

                            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog bg-light modal-lg rounded">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h2 className='text-success text-center text-uppercase fs-1'>Crear proveedor</h2>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form className="producto-form" onSubmit={handleSubmit(editProveedor)} onChange={handleCheckInputs}>
                                                <div className="row text-success d-flex mb-3">
                                                    <div className='w-50'>
                                                        <label htmlFor="nombre_proveedor" className="form-label">Nombre del proveedor</label>
                                                        <input name="nombre_proveedor" type="text" className={`form-control ${!checkForm.nombre_proveedor ? 'is-invalid' : 'is-valid'}`} maxlength="60" id="nombre_proveedor" value={checkForm.nombre_proveedor} {...register('nombre_proveedor', { required: true })} />
                                                    </div>
                                                    <div className='w-50'>
                                                        <label htmlFor="correo_proveedor" className="form-label">Correo del proveedor</label>
                                                        <input type="email" className={`form-control ${!checkForm.correo_proveedor ? 'is-invalid' : 'is-valid'}`} value={checkForm.correo_proveedor} id="correo_proveedor" {...register('correo_proveedor', { required: true })} />
                                                    </div>
                                                </div>
                                                <div className="row text-success d-flex mb-3">
                                                    <div className='w-50'>
                                                        <label htmlFor="contacto_proveedor" className="form-label">Teléfono del proveedor</label>
                                                        <input name="contacto_proveedor" type="number" className={`form-control ${!checkForm.contacto_proveedor ? 'is-invalid' : 'is-valid'}`} id="contacto_proveedor" value={checkForm.contacto_proveedor} {...register('contacto_proveedor', { required: true })} />
                                                    </div>
                                                    <div className='w-50'>
                                                        <label htmlFor="nit_proveedor" className="form-label">Nit del proveedor</label>
                                                        <input type="number" className={`form-control ${!checkForm.nit_proveedor ? 'is-invalid' : 'is-valid'}`} value={checkForm.nit_proveedor} min='1' id="nit_proveedor" {...register('nit_proveedor', { required: true })} />
                                                    </div>
                                                </div>
                                                <div className="row text-success d-flex mb-3">
                                                    <div className='w-100'>
                                                        <label htmlFor="direccion_proveedor" className="form-label">Dirección del proveedor</label>
                                                        <input type="text" className={`form-control ${!checkForm.direccion_proveedor ? 'is-invalid' : 'is-valid'}`} value={checkForm.direccion_proveedor} id="direccion_proveedor" {...register('direccion_proveedor', { required: true })} />
                                                    </div>
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
                                    <Form onSubmit={handleSubmit(editProveedor)}>
                                        <label htmlFor="proveedor" className="form-label" >Proveedor</label>

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Nombre del proveedor</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Samsung..."
                                                // value={modalData.nombre_producto}
                                                autoFocus
                                                {...register('nombre_proveedor', { required: true })}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label>Correo Proveedor</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Example@gmail.com"
                                                //value={modalData.tipo_producto}
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
                        </div>
                    </div >

            }
        </>
    );
});

export default NuestrosProveedores;