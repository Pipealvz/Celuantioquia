import Axios from 'axios';
import React, { memo } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"
import Navbar from '../../Pages/Componets/sidebar';

const CrearProducto = memo(() => {

    const { register, handleSubmit } = useForm();

    const createProduct = values => {

        //Se llama el enlace dle servicio y se le asiganan los valores al 
        //objeto que se con datos ingresasos en el formulario

        Axios.post("https://celuantioqueno.onrender.com/producto/crearProducto", {
            nombre_producto: values.nombre_producto,
            tipo_producto: values.tipo_producto,
            cantidad: values.cantidad,
            precio: values.precio,
            descripcion: values.descripcion,
            producto_destacado: values.producto_destacado
        },
        )
            .then(function (res) {
                console.log(res);
                //             Alerta si se crea el producto correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "Producto creado con exito",
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
                    text: "No se pudo crear el producto",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    };


    return (<div className=' d-flex'>

        <Navbar />

        <div className=' container shadow-lg ' style={{ padding: '4rem', margin: '8rem 12rem 5rem 12rem', borderRadius: '1rem' }}>
            <div className='container vh-100'>
                <h2 className='text-success text-center text-uppercase fs-1'>Crear producto</h2>
                <hr />
                <form className="producto-form" onSubmit={handleSubmit(createProduct)}>
                    <div className="row text-success d-flex mb-3">
                        <label for="nombre_producto" className="form-label">Nombre del producto</label>
                        <input type="text" className="form-control" maxlength="40" id="nombre_producto" {...register('nombre_producto', { required: true })} />
                    </div>
                    <div className="row text-success d-flex  mb-3">
                        <label for="tipo_producto" className="form-label">Tipo del produto</label>
                        <select class="form-select" aria-label="Default select example"
                        id="tipo_producto" {...register('tipo_producto', { required: true })} >
                            <option value="1">Celular</option>
                            <option value="2">Accesorios de celular</option>
                            <option value="3">Tableta</option>
                            <option value="4">Audio</option>
                        </select>
                    </div>
                    <div className="row text-success d-flex  mb-3">
                        <label for="cantidad" className="form-label">Cantidad del producto</label>
                        <input type="number" min="1" className="form-control" max="100000" id="cantidad"{...register('cantidad', { required: true })} />
                    </div>
                    <div className="row text-success d-flex  mb-3">
                        <label for="precio" className="form-label">Precio del producto</label>
                        <input type="number" min="1" className="form-control"max="100000000000" id="precio" {...register('precio', { required: true })} />
                    </div>
                    <div className="row text-success d-flex  mb-3">
                        <label for="descripcion" className="form-label">Descripción</label>
                        <textarea type="text" className="form-control text-area"minlength="10"  maxlength="100" id="descripcion" {...register('descripcion', { required: true })}></textarea>
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
                    <br />
                    <div className="col text-center">
                        <input type="submit" value="Crear" className="btn btn-success mt-4 mb-4" />
                    </div>
                    <br />
                </form>

            </div>
        </div>
    </div>);
});

export default CrearProducto;