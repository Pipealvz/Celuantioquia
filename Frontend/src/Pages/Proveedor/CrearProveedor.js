import Axios from '../Axios/axios';
import React, { memo } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"
import Navbar from '../../Pages/Componets/sidebar';

const CrearProveedor = memo(() => {

    const { register, handleSubmit } = useForm();

    const createProveedor = values => {

        //Se llama el enlace dle servicio y se le asiganan los valores al 
        //objeto que se con datos ingresasos en el formulario

        Axios.post("proveedor/crearProveedor", {
            nombre_proveedor: values.nombre_proveedor,
            correo_proveedor: values.correo_proveedor,
            contacto_proveedor: values.contacto_proveedor,
            nit_proveedor: values.nit_proveedor,
            direccion_proveedor: values.direccion_proveedor
        },
        )
            .then(function (res) {
                console.log(res);
                //             Alerta si se crea el Proveedor correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "Proveedor creado con exito",
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
                //             Alerta si ocurre algun error al crea el Proveedor 

                Swal.fire({
                    title: "Error",
                    text: "No se pudo crear el Proveedor",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    };


    return (<div className='d-flex'>
        <Navbar />
        <div className=' container shadow-lg ' style={{ padding: '4rem', margin: '6rem 10rem 3rem 10rem', borderRadius: '1rem' }}>
            <div className='container vh-100'>
                <h2 className='text-success text-center text-uppercase fs-1'>Crear Proveedor</h2>
                <hr />
                <form className="proveedor-form" onSubmit={handleSubmit(createProveedor)}>
                    <div className="row text-success d-flex mb-3">
                        <label for="nombre_producto" className="form-label">Nombre proveedor</label>
                        <input type="text" className="form-control" id="nombre_proveedor" {...register('nombre_proveedor', { required: true })} />
                    </div>
                    <div className="row text-success d-flex  mb-3">
                        <label for="tipo_producto" className="form-label">Correo Proveedor</label>
                        <input type="email" className="form-control mt-4 mb-4" id="correo_proveedor" {...register('correo_proveedor', { required: true })} />
                    </div>
                    <div className="row text-success d-flex  mb-3">
                        <label for="cantidad" className="form-label">contacto proveedor</label>

                        <div className="input-group  mb-3"style={{padding: '0rem 0rem'}}>
                            <span className="input-group-text bg-success text-light">📱 604</span>
                            <input type="number" min="1" className="form-control" id="contacto_proveedor"{...register('contacto_proveedor', { required: true })} />
                        </div>
                    </div>
                    <div className="row text-success d-flex  mb-3">
                        <label for="precio" className="form-label">Nit del proveedor</label>
                        <input type="number" min="1" className="form-control" id="nit_proveedor" {...register('nit_proveedor', { required: true })} />
                    </div>
                    <div className="row text-success d-flex  mb-3">
                        <label for="descripcion" className="form-label">Dirección del proveedor</label>
                        <textarea type="text" className="form-control text-area" id="direccion_proveedor" {...register('direccion_proveedor', { required: true })}></textarea>
                    </div>
                    <br />
                    <div className="col text-center">
                        <input type="submit" value="Crear" className="btn btn-success mt-4 mb-4" />
                    </div>
                    <br />
                </form>

            </div>
        </div>
    </div>
    )

});

export default CrearProveedor;