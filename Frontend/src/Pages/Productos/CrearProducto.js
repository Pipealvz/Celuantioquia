import Axios from 'axios';
import React, { memo } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"
import Navbar from '../../Pages/Componets/Navbar';

const CrearProducto = memo(() => {

    const { register, handleSubmit } = useForm();

    const createProduct = values => {

        //Se llama el enlace dle servicio y se le asiganan los valores al 
        //objeto que se con datos ingresasos en el formulario

        Axios.post("http://localhost:5000/producto/crearProducto", {
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


    return (<>
        <Navbar />

        <div className=' container shadow-lg ' style={{ padding: '4rem', marginBottom: '2rem', borderRadius: '1rem' }}>
            <div className='container vh-100'>
                <h2 className='text-success text-center text-uppercase fs-1'>Crear producto</h2>
                <hr />
                <form className="producto-form" onSubmit={handleSubmit(createProduct)}>
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
                            <input class="form-check-input" type="radio" id="producto_destacado" value="1" {...register('producto_destacado', { required: true })}/>
                                <label class="form-check-label" >Destacar producto.</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio"  id="producto_no_destacado" value="0" {...register('producto_destacado', { required: true })}/>
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
    </>);
});

export default CrearProducto;