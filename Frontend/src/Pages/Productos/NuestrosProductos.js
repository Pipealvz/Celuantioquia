import Axios from 'axios';
import React, { memo } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



import Navbar from '../Componets/Navbar';
// import img from '../../images/asd.jpg'

const NuestrosProductos = memo(() => {


    const [post, setPost] = React.useState(null);
    const [modalData, setModalData] = React.useState(null);


    const [deleteShow, setDeletehow] = React.useState(false);
    const [editShow, setEdithow] = React.useState(false);

    const { register, handleSubmit } = useForm();

    React.useEffect(() => {
        getAllProductos();

    }, []);



    const getAllProductos = () => {
        Axios.post('http://localhost:5000/producto/nuestrosProductos')
            .then((response) => {
                setPost(response.data)
            });
    }


    const editProducto = values => {

        debugger;

        Axios.post('http://localhost:5000/producto/actualizarProducto', {
            id_producto:  values.id_producto,
            nombre_producto: values.nombre_producto,
            tipo_producto: values.tipo_producto,
            cantidad: values.cantidad,
            precio: values.precio,
            descripcion: values.descripcion,
            producto_destacado: values.producto_destacado,
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





    function deleteProducto(id) {
        Axios.post('http://localhost:5000/producto/eliminarProducto', {
            id_producto: id
        })
            .then(() => {
                window.location.reload(true);
            });
    }




    if (!post) return null;

    return (
        <>
            <Navbar />
            <div className='container d-flex'>
                <div className='row justify-content-around'>
                    {post.map((item) => {

                        return (

                            item ? (
                                <div className="card border border-success rounded p-2 col-5 mb-5" key={item.id_producto}>
                                    <div className='row-fluid d-flex justify-content-between'>
                                        <div className='text-center  text-success border border-success rounded-pill col-2'
                                            style={{ height: 'fit-content', width: 'auto', padding: '0.3rem' }}
                                        >
                                            {item.tipo_producto}
                                        </div>
                                        <div className='text-center text-success col-2 fw-bold fs-5 font-monospace'>
                                            {item.precio}
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row col">
                                        <h5 className="card-title">{item.nombre_producto}</h5>
                                        <p className="card-text">{item.descripcion}</p>
                                    </div>
                                    <hr />
                                    <div className='row-fluid d-flex justify-content-between'>
                                        <div className='text-success'>
                                            Cantidad:
                                        </div>

                                        <div className='border border-success rounded-pill col-1 text-center fw-bold'
                                            style={{ width: 'auto', padding: '0.3rem' }}
                                        >
                                            {item.cantidad}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <Button variant="danger" style={{ margin: '1rem', width: 'auto' }} onClick={() => { setModalData(item); setDeletehow(true); }} > Eliminar</Button>
                                        <Button variant="warning" style={{ margin: '1rem', width: 'auto' }} onClick={() => { setModalData(item); setEdithow(true); }}>Editar</Button>
                                    </div>
                                </div>) : null
                        )
                    })}


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
                            <Button variant="success" onClick={() => { deleteProducto(modalData.id_producto) }}>
                                si
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal  show={editShow} 
                            onHide={() => setEdithow(false)}
                        aria-labelledby="contained-modal-title-vcenter"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Editar producto
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form >
                            {/* <label for="nombre_producto" className="form-label">{modalData.id_producto}</label> */}

                                <div className="row text-success d-flex mb-3">
                                    <label for="nombre_producto" className="form-label">Nombre del producto</label>
                                    <input type="text" className="form-control" id="nombre_producto" {...register('nombre_producto', { required: true })} />
                                </div>
                                <div className="row text-success d-flex  mb-3">
                                    <label for="tipo_producto" className="form-label">Tipo del produto</label>
                                    <input type="text" className="form-control" id="tipo_producto" {...register('tipo_producto', { required: true })} />
                                </div>
                                <div className="row text-success d-flex  mb-3">
                                    <label for="cantidad" className="form-label">Cantidad del producto</label>
                                    <input type="number" min="1" className="form-control" id="cantidad"{...register('cantidad', { required: true })} />
                                </div>
                                <div className="row text-success d-flex  mb-3">
                                    <label for="precio" className="form-label">Precio del producto</label>
                                    <input type="number" min="1" className="form-control" id="precio" {...register('precio', { required: true })} />
                                </div>
                                <div className="row text-success d-flex  mb-3">
                                    <label for="descripcion" className="form-label">Descripción</label>
                                    <textarea type="text" className="form-control text-area" id="descripcion" {...register('descripcion', { required: true })}></textarea>
                                </div>
                                <div class="form-check">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="producto_destacado" value="1" {...register('producto_destacado', { required: true })} />
                                        <label class="form-check-label" >Destacar producto.</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="producto_no_destacado" value="0" {...register('producto_destacado', { required: true })} />
                                        <label class="form-check-label"> No destacar producto.</label>
                                    </div>
                                </div>
                            </form>
                            <Modal.Footer>
                                <Button variant="success" onClick={() => setEdithow(false)}>
                                    Cancelar
                                </Button>
                                <Button variant="success" onClick={() => { editProducto()}}>
                                Crear
                            </Button>
                            </Modal.Footer>

                        </Modal.Body>
                    </Modal>
                </div>

            </div>
        </>
    );
});

export default NuestrosProductos;