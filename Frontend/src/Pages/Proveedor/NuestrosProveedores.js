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



const NuestrosProveedores = memo(() => {


    const [post, setPost] = React.useState(null);
    const [modalData, setModalData] = React.useState(null);


    const [deleteShow, setDeletehow] = React.useState(false);
    const [editShow, setEditShow] = React.useState(false);

    const { register, handleSubmit } = useForm();

    React.useEffect(() => {
        getAllProveedor();
    }, []);



    const getAllProveedor = () => {
        Axios.post('https://celuantioqueno.onrender.com/proveedor/nuestrosProveedores')
            .then((response) => {
                setPost(response.data)
            });
    }


    const editProveedor = values => {

        console.log(modalData);

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
                //             Alerta si se crea el producto correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "Producto actualizado con exito",
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
                    text: "No se pudo actualizar el producto",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    }





    function deleteProveedor(id) {
        Axios.post('https://celuantioqueno.onrender.com/proveedor/eliminarProveedores', {
            id_proveedor: id
        })
            .then(() => {
                window.location.reload(true);
            });
    }




    if (!post) return null;

    return (
        <div className='d-flex'>

            <Navbar />
            <div className='container'style={{  margin: '8rem 4rem 5rem 4rem'}}>

                <h2 className='text-success text-center text-uppercase fs-1'>Proveedores</h2>
                <br/>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <Link class="btn btn-success" type="button" to="/CrearProveedor">Crear Proveedor</Link>
                </div>
                <br/>
                <table class="table text-success">
                    <thead>
                        <tr>
                            <th scope="col">#Id</th>
                            <th scope="col">Nombre Proveedor</th>
                            <th scope="col">Correo Proveedor</th>
                            <th scope="col">Contacto</th>
                            <th scope="col">Nit</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider ">

                        {post.map((item) => {

                            return (
                                <tr class="table-light text-success ">
                                    <th scope="row" key={item.id_proveedor}>{item.id_proveedor}</th>
                                    <td>{item.nombre_proveedor}</td>
                                    <td>{item.correo_proveedor}</td>
                                    <td>{item.contacto_proveedor}</td>
                                    <td>{item.nit_proveedor}</td>
                                    <td>{item.direccion_proveedor}</td>
                                    <td>
                                        <div className='row d-flex'>
                                            <Button variant="outline-success" style={{ margin: '1rem', width: 'auto' }} onClick={() => { setModalData(item); setDeletehow(true); }} ><FaIcons.MdDelete className="" /></Button>
                                            <Button variant="outline-success" style={{ margin: '1rem', width: 'auto' }} onClick={() => { setModalData(item); setEditShow(true); }}><FaIcons.MdModeEdit className="" /></Button>
                                        </div>
                                    </td>

                                </tr>

                            )

                        })}
                    </tbody>
                </table>

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
                        <Button variant="success" onClick={() => { deleteProveedor(modalData.id_proveedor) }}>
                            si
                        </Button>
                    </Modal.Footer>
                </Modal>


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
                            <label for="nombre_producto" className="form-label" >Proveedor</label>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nombre del proveedor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="..."
                                    // value={modalData.nombre_producto}
                                    autoFocus
                                    {...register('nombre_proveedor', { required: true })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Correo Proveedor</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder=""
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