import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"
import './producto.css'

const CrearProducto = () => {

    const { register, handleSubmit } = useForm();
    const [category, setCategory] = useState([]);
    const [checkForm, setCheckForm] = useState({
        nombre_producto: '',
        cantidad: '',
        precio: '',
        descripcion: ''
    });

    const handleCheckInputs = ({ target }) => {
        setCheckForm({ ...checkForm, [target.name]: target.value });
        //console.log(target.value);
    }

    const getCategory = () => {
        Axios.post('https://celuantioqueno.onrender.com/categoria/nuestrasCategorias')
            .then((res) => {
                setCategory(res.data)
                console.log(res.data);
            });
    }

    useEffect(() => {
        getCategory();
    }, []);

    const createProduct = values => {

        //Se llama el enlace del servicio y se le asiganan los valores al 
        //objeto que se con datos ingresasos en el formulario

        Axios.post("https://celuantioqueno.onrender.com/producto/crearProducto", {
            nombre_producto: values.nombre_producto,
            tipo_producto: values.tipo_producto,
            cantidad: values.cantidad,
            precio: values.precio,
            descripcion: values.descripcion,
            producto_destacado: values.producto_destacado
        },)
            .then(function (res) {
                console.log(res);
                // Alerta si se crea el cliente correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "Cliente creado con exito",
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
                //Alerta si ocurre algun error al crea el cliente 
                Swal.fire({
                    title: "Error",
                    text: "No se pudo crear el cliente",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    };

    return (
        <>
            <div className="modal-dialog bg-light modal-lg rounded">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className='text-success text-center text-uppercase fs-1'>Crear producto</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="producto-form" onSubmit={handleSubmit(createProduct)} onChange={handleCheckInputs}>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="nombre_producto" className="form-label">Nombre del producto</label>
                                    <input name="nombre_producto" type="text" className={`form-control ${!checkForm.nombre_producto ? 'is-invalid' : 'is-valid'}`} maxlength="60" id="nombre_producto" value={checkForm.nombre_producto} {...register('nombre_producto', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="tipo_producto" className="form-label">Tipo del produto</label>
                                    <select className="form-select is-valid" aria-label="Default select example" id="tipo_producto" {...register('tipo_producto', { required: true })} >
                                        <option value=''>Seleccionar tipo de producto</option>
                                        {!category ? 'No hay categorías disponibles' :
                                            category.map((item) => {

                                                return (
                                                    <option key={item.id_categoria} value={item.id_categoria}>{item.nombre_categoria}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="cantidad" className="form-label">Cantidad del producto</label>
                                    <input type="number" className={`form-control ${checkForm.cantidad <= 0 ? 'is-invalid' : 'is-valid'}`} value={checkForm.cantidad} min="1" max="999" id="cantidad"{...register('cantidad', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="precio" className="form-label">Precio del producto</label>
                                    <input type="number" className={`form-control ${checkForm.precio <= 0 ? 'is-invalid' : 'is-valid'}`} value={checkForm.precio} min="1" max="1000000000" id="precio" {...register('precio', { required: true })} />
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-75'>
                                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                                    <textarea type="text" className={`form-control text-area ${!checkForm.descripcion ? 'is-invalid' : 'is-valid'}`} value={checkForm.descripcion} minLength="10" maxLength="100" id="descripcion" {...register('descripcion', { required: true })}></textarea>
                                </div>
                                <div className='w-25 form-check align-self-center'>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" id="producto_destacado" value="1" {...register('producto_destacado', { required: true })} />
                                        <label className="form-check-label" >Destacar</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" id="producto_no_destacado" value="0" {...register('producto_destacado', { required: true })} />
                                        <label className="form-check-label"> No destacar</label>
                                    </div>
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
    );
};

export default CrearProducto;