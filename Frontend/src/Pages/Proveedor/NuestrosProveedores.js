import Axios from 'axios';
import React, { memo } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Navbar from '../Componets/sidebar';
import * as FaIcons from "react-icons/md";
import CrearProveedor from './CrearProveedor';



const NuestrosProveedores = memo(() => {


    const [post, setPost] = React.useState(null);
    const [modalData, setModalData] = React.useState(null);

    const [editShow, setEditShow] = React.useState(false);

    const { register, handleSubmit } = useForm();

    React.useEffect(() => {
        getAllProveedor();
    }, []);



    const getAllProveedor = () => {
        Axios.post('http://localhost:3306/proveedor/nuestrosProveedores')
            .then((response) => {
                setPost(response.data)
            });
    }


    const editProveedor = values => {

        console.log(modalData);

        Axios.post('http://localhost:3306/proveedor/actualizarProveedor', {
            id_proveedor: modalData.id_proveedor,
            nombre_proveedor: values.nombre_proveedor,
            correo_proveedor: values.correo_proveedor,
            contacto_proveedor: values.contacto_proveedor,
            nit_proveedor: values.nit_proveedor,
            direccion_proveedor: values.direccion_proveedor
        })
            .then(function (res) {
                console.log(res);
                //             Alerta si se crea el producto correctamente
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
                //             Alerta si ocurre algun error al crea el producto 

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
                Axios.post('http://localhost:3306/proveedor/eliminarProveedores', {
                    id_proveedor: id
                })
                    .then(() => {
                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            'El proveedor fue eliminado',
                            'success'
                        ).then(() => {
                            window.location.reload();
                        })
                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'No se eliminó ningún archivo',
                    'error'
                )
            }
        })
    }



    if (!post) return null;

    return (
        <div className='d-flex'>

            <Navbar />
            <div className='container' style={{ margin: '8rem 4rem 5rem 4rem' }}>

                <h2 className='text-success text-center text-uppercase fs-1'>Proveedores</h2>
                <br />
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Crear proveedor
                    </button>
                </div>
                <br />
                <table className="table text-success">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre Proveedor</th>
                            <th scope="col">Correo Proveedor</th>
                            <th scope="col">Contacto</th>
                            <th scope="col">Nit</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider ">

                        {post.map((item) => {

                            return (
                                <tr className="table-light text-success ">
                                    <th scope="row" key={item.id_proveedor}></th>
                                    <td>{item.nombre_proveedor}</td>
                                    <td>{item.correo_proveedor}</td>
                                    <td>{item.contacto_proveedor}</td>
                                    <td>{item.nit_proveedor}</td>
                                    <td>{item.direccion_proveedor}</td>
                                    <td>
                                        <div className='row d-flex'>
                                            <Button variant="outline-success" style={{ margin: '1rem', width: 'auto' }} onClick={() => { deleteProveedor(item.id_proveedor); }} ><FaIcons.MdDelete className="" /></Button>
                                            <Button variant="outline-success" style={{ margin: '1rem', width: 'auto' }} onClick={() => { setModalData(item); setEditShow(true); }}><FaIcons.MdModeEdit className="" /></Button>
                                        </div>
                                    </td>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <CrearProveedor />
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
                            <label for="proveedor" className="form-label" >Proveedor</label>

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
        </div>

    );
});

export default NuestrosProveedores;