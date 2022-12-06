import Axios from 'axios';
import React, { memo } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Navbar from '../Componets/Navbar';



const NuestrosProductos = memo(() => {


    const [post, setPost] = React.useState(null);
    const [modalData, setModalData] = React.useState(null);


    const [deleteShow, setDeletehow] = React.useState(false);
    const [editShow, setEditShow] = React.useState(false);

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

        console.log(modalData);

        Axios.post('http://localhost:3306/producto/actualizarProducto', {
            id_producto: modalData.id_producto,
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
                                    <Button variant="warning" style={{ margin: '1rem', width: 'auto' }} onClick={() => { setModalData(item); setEditShow(true);}}>Editar</Button>
                                </div>
                            </div>
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
                                <Form onSubmit={handleSubmit(editProducto)}>
                                <label for="nombre_producto" className="form-label" >Producto</label>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Nombre del producto</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Samsung..."
                                            // value={modalData.nombre_producto}
                                            autoFocus
                                            {...register('nombre_producto', { required: true })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label>Tipo del produto</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Celular"
                                            //value={modalData.tipo_producto}
                                            autoFocus
                                            {...register('tipo_producto', { required: true })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label>Cantidad del producto</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="50"
                                            // value={modalData.cantidad}
                                            autoFocus
                                            {...register('cantidad', { required: true })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label>Precio del producto</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="50"
                                            // value={modalData.precio}
                                            autoFocus
                                            {...register('precio', { required: true })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control as="textarea" rows={3} 
                                        // value={modalData.descripcion}
                                            {...register('descripcion', { required: true })}

                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" value="1" id="flexRadioDefault1" {...register('producto_destacado', { required: true })} />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Destacar producto.
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" value="0" id="flexRadioDefault2" checked {...register('producto_destacado', { required: true })} />
                                            <label class="form-check-label" for="flexRadioDefault2">
                                                No destacar producto.
                                            </label>
                                        </div>
                                    </Form.Group>
                                
                                <Modal.Footer>
                                    <Button variant="success" onClick={() => setEditShow(false)}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit"  onClick={editProducto} variant="success" >
                                        Guardar cambios
                                    </Button>
                                </Modal.Footer>
                                </Form>
                            </Modal.Body>

                    </Modal>
                </div>

            </div>
        </>
    );
});

export default NuestrosProductos;