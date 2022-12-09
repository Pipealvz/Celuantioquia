import React from 'react';
import Axios from "axios";
import { useForm } from 'react-hook-form';
//import React, { useState } from 'react';
import Swal from "sweetalert2";



const CrearEmpleado = () => {

    const { register, handleSubmit } = useForm();
    //const { empleados, setEmpleados } = useState();

    const empleadoRegister = values => {

        console.log("Empleado registrado");
        Axios.post("", {
            
            nombre_empleado: values.nombre_empleado,
            correo_empleado: values.correo_empleado,
            contrasena_empleado: values.contraseña_empleado,
            documento_empleado: values.documento_empleado,
            tipo_empleado: values.tipo_empleado,
            direccion_empleado: values.direccion_empleado,
            telefono_empleado: values.telefono_empleado,
            fecha_nacimiento_empleado: values.fecha_nacimiento_empleado,
            rol_empleado: values.rol_empleado

        },
            //  { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, }

        )
            .then(function (res) {
                console.log(res);

                Swal.fire({
                    title: "Empleado registrado",
                    text: "Se registró el empleado exitosamente",
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

                Swal.fire({
                    title: "Error",
                    text: "No se pudo registrar el empleado, intente de nuevo",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    };
    return (
        <div className="modal fade" id="modal-empleado" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className='container p-4 vh-auto border rounded shadow'>
                        <h2 className='text-success text-center text-uppercase fs-1'>Registrar Empleado</h2>
                        <hr />
                        <form onSubmit={handleSubmit(empleadoRegister)}>
                            <div className="row text-success d-flex  mb-3">
                                <label htmlFor="documento_empleado" className="form-label">Documento de identidad</label>
                                <div className="input-group">
                                    <select className="input-group-text bg-success text-light" {...register('tipo_documento', { required: true })}>
                                        <option className="form-control" id="tipo_documento">Cédula ciudadana</option>
                                        <option className="form-control" id="tipo_documento">Cédula extranjera</option>
                                    </select>
                                    <input type="number" min="1" className="form-control" id="documento_empleado" {...register('documento_empleado', { required: true })} />
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <label htmlFor="nombre_empleado" className="form-label">Nombre del empleado</label>
                                <input type="text" className="form-control" id="nombre_empleado" {...register('nombre_empleado', { required: true })} />
                            </div>
                            <div className="row text-success d-flex  mb-3">
                                <label htmlFor="correo_empleado" className="form-label">Correo del empleado</label>
                                <input type="email" className="form-control" id="correo_empleado" {...register('correo_empleado', { required: true })} />
                            </div>
                            <div className="row text-success d-flex  mb-3">
                                <label htmlFor="contraseña_empleado" className="form-label">Contraseña del empleado</label>
                                <div className="input-group">
                                    <input type="password" className="form-control" id="contraseña_empleado" {...register('contraseña_empleado', { required: true })} />
                                </div>
                            </div>
                            <div className="row text-success d-flex  mb-3">
                                <label htmlFor="telefono_empleado" className="form-label">Teléfono del empleado</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-success text-light">📱 604 / +57</span>
                                    <input type="number" min="1" className="form-control" id="telefono_empleado" placeholder="Número de teléfono o celular" {...register('telefono_empleado', { required: true })} />
                                </div>
                            </div>
                            <div className="row text-success d-flex  mb-3">
                                <span>Rol del empleado</span>
                                <select htmlFor="rol_empleado" className="form-select" {...register('rol_empleado', { required: true })}>
                                    <option className="form-control" id="rol_empleado">Administrador</option>
                                    <option className="form-control" id="rol_empleado">Empleado</option>
                                </select>
                            </div>
                            <div className="row text-success d-flex  mb-3">
                                <label htmlFor="direccion_empleado" className="form-label">Dirección del empleado</label>
                                <input type="text" className="form-control" id="direccion_empleado" {...register('direccion_empleado', { required: true })} />
                            </div>

                            <br />
                            <div className='d-flex justify-content-center'>
                                <button type="submit" className="btn btn-success col-6" value="Crear">Registrar Empleado</button>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Default radio
                                    </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Default checked radio
                                    </label>
                            </div>
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CrearEmpleado;