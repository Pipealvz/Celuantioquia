import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"

const Ventas = () => {

    const newDate = new Date();
    const fecha = newDate.toLocaleDateString();
    const hora = newDate.toLocaleTimeString();

    const { register, handleSubmit } = useForm();
    const [products, setProducts] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [checkForm, setCheckForm] = useState({
        cantidad_venta: '',
        detalle_venta: '',
    });

    const getProducts = () => {
        Axios.post('http://localhost:3306/producto/nuestrosProductos')
            .then((response) => {
                setProducts(response.data);
            });
    }

    const getcliente = () => {
        Axios.post('http://localhost:3306/cliente/nuestrosClientes')
            .then((response) => {
                if (!response) {
                    setCliente('0');
                } else {
                    setCliente(response.data);
                }
            });
    }

    const createVenta = (values) => {
        Axios.post("http://localhost:3306/producto/agregarVenta", {
            id_producto: values.id_producto,
            id_cliente: values.id_cliente,
            cantidad_venta: values.cantidad_venta,
            detalle_venta: values.detalle_venta,
            fecha_venta: `${fecha} - ${hora}`,
        })
            .then(function (res) {
                console.log(res);
                // Alerta si se crea la venta correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "La venta fue ingresada con éxito",
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
                //Alerta si ocurre algun error al crea la venta
                Swal.fire({
                    title: "Error",
                    text: "No se pudo ingresar la venta",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    }

    useEffect(() => {
        getProducts();
        getcliente();
    }, []);

    const handleCheckInputs = ({ target }) => {
        setCheckForm({ ...checkForm, [target.name]: target.value });
        //console.log(target.value);
    }
    return (
        <>
            <div className="modal-dialog bg-light modal-lg rounded">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className='text-success text-center text-uppercase fs-1'>Agregar venta</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="producto-form" onSubmit={handleSubmit(createVenta)} onChange={handleCheckInputs}>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="id_producto" className="form-label">Seleccione el producto:</label>
                                    <select className="form-select is-valid" aria-label="Default select example" id="id_producto" {...register('id_producto', { required: true })} >
                                        {!products ? 'No hay compras disponibles' :
                                            products.map((item) => {
                                                return (
                                                    <option key={item.id_producto} value={item.id_producto}>{item.nombre_producto}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="id_cliente" className="form-label">Seleccione el cliente:</label>
                                    <select className="form-select is-valid" aria-label="Default select example" id="id_cliente" {...register('id_cliente', { required: true })} >
                                        {cliente === '0' ?
                                            <option key='1' className='disabled'>No hay clientes disponibles</option> :
                                            cliente.map((item) => {
                                                return (
                                                    <option key={item.id_cliente} value={item.id_cliente}>{item.nombre_cliente}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="cantidad_venta" className="form-label">Cantidad: </label>
                                    <input type="number" className={`form-control ${checkForm.cantidad_venta <= 0 ? 'is-invalid' : 'is-valid'}`} value={checkForm.cantidad_venta} min="1" id="cantidad_venta"{...register('cantidad_venta', { required: true })} />
                                </div>
                                <div className='w-100'>
                                    <label htmlFor="detalle_venta" className="form-label">Detalle de la venta:</label>
                                    <textarea type="text" className={`form-control text-area ${!checkForm.detalle_venta ? 'is-invalid' : 'is-valid'}`} value={checkForm.detalle_venta} minLength="10" maxLength="100" id="detalle_venta" {...register('detalle_venta', { required: true })}></textarea>
                                </div>
                            </div>
                            <div className="text-center">
                                <input type="submit" value="Crear" className="btn btn-success mt-4 w-50" />
                            </div>
                            <br />
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Ventas;