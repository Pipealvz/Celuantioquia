import Axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
// import { useForm } from "react-hook-form"
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import Navbar from '../../Pages/Componets/sidebar';
import * as FaIcons from "react-icons/md";
import CrearProducto from './CrearProducto';
import EditarProducto from './EditarProducto';
//import SpinnerGrow from '../SpinnerGrow';
import SpinnerBorder from '../SpinnerGrow';



const NuestrosProductos = () => {


    const [post, setPost] = React.useState(null);
    //const [modalData, setModalData] = React.useState(null);

    // const getModalData = (id) => {
    //     let newId = id
    //     return deleteProducto(newId);
    // }


    //const [deleteShow, setDeletehow] = React.useState(false);
    const [editShow, setEditShow] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //const { register, handleSubmit } = useForm();

    //const [category, setCategory] = useState([]);

    const handleSubmitEdit = (id_producto) => {
        //console.log(id_producto);
        const arrayPost = [...post];
        //console.log(arrayPost);
        const todo = arrayPost.find(array => array.id_producto === id_producto);
        setEditShow({ id_producto: todo.id_producto, nombre_producto: todo.nombre_producto, tipo_producto: todo.tipo_producto, cantidad: todo.cantidad, precio: todo.precio, descripcion: todo.descripcion, producto_destacado: todo.producto_destacado, });
        //console.log(todo);
    }

    // const getCategory = () => {
    //     // nombre_categoria
    //     Axios.post('http://localhost:3306/categoria/nuestrasCategorias')
    //         .then((res) => {
    //             setCategory(res.data)
    //             console.log(res.data);
    //         });
    // }

    React.useEffect(() => {
        getAllProductos();
        //getCategory();
    }, []);

    const getAllProductos = () => {
        Axios.post('http://localhost:3306/producto/nuestrosProductos')
            .then((response) => {
                setPost(response.data);
                setIsLoading(false);
            });
    }

    // const editProducto = values => {

    //     console.log(modalData);

    //     Axios.post('http://localhost:3306/producto/actualizarProducto', {
    //         id_producto: modalData.id_producto,
    //         nombre_producto: values.nombre_producto,
    //         tipo_producto: values.tipo_producto,
    //         cantidad: values.cantidad,
    //         precio: values.precio,
    //         descripcion: values.descripcion,
    //         producto_destacado: values.producto_destacado,
    //     })
    //         .then(function (res) {
    //             console.log(res);
    //             //             Alerta si se crea el producto correctamente
    //             Swal.fire({
    //                 title: "Proceso exitoso",
    //                 text: "Producto actualizado con exito",
    //                 icon: "success",
    //                 confirmButtonText: "Aceptar",
    //             }).then((res) => {
    //                 if (res.isConfirmed === true) {
    //                     window.location.reload(true);
    //                 }
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             //             Alerta si ocurre algun error al crea el producto 

    //             Swal.fire({
    //                 title: "Error",
    //                 text: "No se pudo actualizar el producto",
    //                 icon: "error",
    //                 confirmButtonText: "Aceptar",
    //             });
    //         });
    // }

    function deleteProducto(id) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro?',
            text: "Si se elimina el producto, no podrá ser recuperado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.post('http://localhost:3306/producto/eliminarProducto', {
                    id_producto: id
                })
                    .then(() => {
                        swalWithBootstrapButtons.fire({
                            title: 'Eliminado!',
                            text: "El producto fue eliminado",
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
                    text: "No se eliminó ningún producto",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }
        })
    }

    return (
        <>
            {
                isLoading === true ?
                    <SpinnerBorder />
                    :
                    <div className='d-flex'>
                        <Navbar />
                        <div className='container' style={{ margin: '8rem 0px 0px 0px' }}>
                            <h2 className='text-success text-center text-uppercase fs-1'>productos</h2>
                            <hr />
                            <br />
                            <div className="d-flex">
                                <form className="d-flex me-1">
                                    <input className="form-control me-2" type="search" placeholder="Buscar producto..." aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                                </form>
                                <button type="button" className="col-2 btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Crear Producto
                                </button>
                                <button type="button" className="col-2 btn btn-success ms-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Registrar compra
                                </button>
                            </div>
                            <br />
                            <table className='container table table-hover'>
                                <thead className='bg-success'>
                                    <tr className='text-light text-center'>
                                        <th className='text-center' scope="col">Cód.</th>
                                        <th className='text-start col-2' scope="col">Nombre Producto</th>
                                        <th scope="col">Cantidad</th>
                                        <th className='text-start col-3' scope="col">Descripción</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Destacado</th>
                                        <th scope="col">Categoría</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                {post.map((item) => {

                                    return (
                                        <>
                                            <tbody className='text-center text-capitalize' key={item.id_producto}>
                                                <tr>
                                                    <td className='text-center' id='tdName'>{item.id_producto}</td>
                                                    <td className='text-start' id='tdName'>{item.nombre_producto}</td>
                                                    <td id='tdStock'>{item.cantidad}</td>
                                                    <td className='text-break text-start' id='tdDescription'>{item.descripcion}</td>
                                                    <td className='text-start' id='tdPrice'>{Math.trunc(item.precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                                    <td id='tdFavorite'>{item.producto_destacado === 1 ? 'Sí' : 'No'}</td>
                                                    <td className='text-start' id='tdCategory'>{item.nombre_categoria}</td>
                                                    <td id='tdActions'>
                                                        <div className='d-flex'>
                                                            <button className="btn btn-danger me-1" onClick={() => { deleteProducto(item.id_producto); }} ><FaIcons.MdDelete /> </button>
                                                            <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleSubmitEdit(item.id_producto) }}> <FaIcons.MdModeEdit /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                })}

                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <CrearProducto />
                                </div>

                                <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                    <EditarProducto data={editShow} />
                                </div>

                                {/* <Modal
                        show={deleteShow}
                        onHide={() => setDeletehow(false)}
                        aria-labelledby="contained-modal-title-vcenter"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Advertencia
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>¿Estas seguro de querer eliminar este producto?</Modal.Body>

                        <Modal.Footer>
                            <Button variant="success" onClick={() => setDeletehow(false)}>
                                No
                            </Button>
                            <Button variant="success" onClick={() => { deleteProducto(modalData.id_producto) }}>
                                si
                            </Button>
                        </Modal.Footer>
                    </Modal> */}


                                {/* <Modal show={editShow}
                        onHide={() => setEditShow(false)}
                        aria-labelledby="contained-modal-title-vcenter"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Editar producto
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form onSubmit={handleSubmit(editProducto)}>
                                <label for="nombre_producto" className="form-label" >Producto</label>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nombre del producto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Samsung..."
                                        //value={modalData.nombre_producto}
                                        autoFocus
                                        {...register('nombre_producto', { required: false })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Tipo del produto</Form.Label>
                                    <select
                                        className='form-select'
                                        as="select"
                                        autoFocus
                                        {...register('tipo_producto', { required: false })}
                                    >
                                        {category.map((item) => {

                                            return (
                                                <option key={item.id_categoria} value={item.id_categoria}>{item.nombre_categoria}</option>
                                            )
                                        })}

                                    </select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Precio del producto</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="$50.000"
                                        //defaultValue={modalData.precio}
                                        // value={modalData.cantidad}
                                        autoFocus
                                        {...register('cantidad', { required: false })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Cantidad del producto</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="50"
                                        //defaultValue={modalData.cantidad}
                                        // value={modalData.precio}
                                        autoFocus
                                        {...register('precio', { required: false })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" rows={3}
                                        // value={modalData.descripcion}
                                        {...register('descripcion', { required: false })}

                                    />
                                </Form.Group>
                                <Form.Group>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" value="1" id="flexRadioDefault1" {...register('producto_destacado', { required: true })} />
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Destacar producto.
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" value="0" id="flexRadioDefault2" checked {...register('producto_destacado', { required: true })} />
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            No destacar producto.
                                        </label>
                                    </div>
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

                    </Modal> */}
                            </table>
                        </div>
                    </div>
            }
        </>
    );
};

export default NuestrosProductos;