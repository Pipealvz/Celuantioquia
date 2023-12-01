import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"



const Compras = () => {

    const newDate = new Date();
    const fecha = newDate.toLocaleDateString();
    const hora = newDate.toLocaleTimeString();

    const { register, handleSubmit } = useForm();
    const [products, setProducts] = useState([]);
    const [proveedor, setProveedor] = useState([]);
    const [checkForm, setCheckForm] = useState({
        id_producto: '',
        id_proveedor: '',
        fecha_compra: '',
        precio_compra: '',
        cantidad_compra: '',
        detalle_compra: ''
    });

    const getProducts = () => {
        Axios.post('https://celuantioqueno.onrender.com/producto/nuestrosProductos')
            .then((response) => {
                setProducts(response.data);
            });
    }

    const getProveedor = () => {
        Axios.post('https://celuantioqueno.onrender.com/proveedor/nuestrosProveedores')
            .then((response) => {
                if (!response) {
                    setProveedor('0');
                } else {
                    setProveedor(response.data);
                }
            });
    }

    const createPurchase = (values) => {
        Axios.post("https://celuantioqueno.onrender.com/producto/agregarCompra", {
            id_producto: values.id_producto,
            id_proveedor: values.id_proveedor,
            fecha_compra: `${fecha} - ${hora}`,
            precio_compra: values.precio_compra,
            cantidad_compra: values.cantidad_compra,
            detalle_compra: values.detalle_compra
        })
            .then(function (res) {
                console.log(res);
                // Alerta si se crea la compra correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "La compra fue ingresada con éxito",
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
                //Alerta si ocurre algun error al crea la compra
                Swal.fire({
                    title: "Error",
                    text: "No se pudo ingresar la compra",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    }

    useEffect(() => {
        getProducts();
        getProveedor();
    }, []);

    const handleCheckInputs = ({ target }) => {
        setCheckForm({ ...checkForm, [target.name]: target.value });
        //console.log(target.value);
    }

    return (
        <div className="modal-dialog bg-light modal-lg rounded">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className='text-success text-center text-uppercase fs-1'>Agregar compra</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className="producto-form" onSubmit={handleSubmit(createPurchase)} onChange={handleCheckInputs}>
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
                                <label htmlFor="id_proveedor" className="form-label">Seleccione el proveedor:</label>
                                <select className="form-select is-valid" aria-label="Default select example" id="id_proveedor" {...register('id_proveedor', { required: true })} >
                                    {proveedor === '0' ?
                                        <option key='1' className='disabled'>No hay proveedores disponibles</option> :
                                        proveedor.map((item) => {
                                            return (
                                                <option key={item.id_proveedor} value={item.id_proveedor}>{item.nombre_proveedor}</option>
                                            )
                                        })}
                                </select>
                            </div>
                        </div>
                        <div className="row text-success d-flex mb-3">
                            <div className='w-50'>
                                <label htmlFor="precio_compra" className="form-label">Precio de compra:</label>
                                <input type="number" className={`form-control ${checkForm.precio_compra <= 0 ? 'is-invalid' : 'is-valid'}`} value={checkForm.precio_compra} min="1" id="precio_compra"{...register('precio_compra', { required: true })} />
                            </div>
                            <div className='w-50'>
                                <label htmlFor="cantidad_compra" className="form-label">Cantidad:</label>
                                <input type="number" className={`form-control ${checkForm.cantidad_compra <= 0 ? 'is-invalid' : 'is-valid'}`} value={checkForm.cantidad_compra} min="1" max="999" id="cantidad_compra" {...register('cantidad_compra', { required: true })} />
                            </div>
                        </div>
                        <div className="row text-success d-flex mb-3">
                            <div className='w-100'>
                                <label htmlFor="detalle_compra" className="form-label">Detalle de la compra:</label>
                                <textarea type="text" className={`form-control text-area ${!checkForm.detalle_compra ? 'is-invalid' : 'is-valid'}`} value={checkForm.detalle_compra} minLength="10" maxLength="100" id="detalle_compra" {...register('detalle_compra', { required: true })}></textarea>
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
    );
}

export default Compras;