import Axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"



const EditarEmpleado = () => {

    const { register, handleSubmit } = useForm();

    const EditarEmpleado = () => {

        Axios.post('http://localhost:5000/producto/actualizarProducto', {
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
                //             Alerta si se crea el empleado correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "Empleado actualizado con exito",
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
                    text: "No se pudo actualizar el empleado",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    }

}
return (<>
    <Navbar />

    <div className="modal fade" id="modal-editEmpleado" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className='container p-4 vh-auto border rounded shadow'>
                    <h2 className='text-success text-center text-uppercase fs-1'>Registrar Empleado</h2>
                    <hr />
                    <form onSubmit={handleSubmit(empleadoRegister)}>
                        <div className="row text-success d-flex  mb-3">
                            <label for="documento_empleado" className="form-label">Documento de identidad</label>
                            <div className="input-group">
                                <select className="input-group-text bg-success text-light" {...register('tipo_documento', { required: true })}>
                                    <option className="form-control" id="tipo_documento">Cédula ciudadana</option>
                                    <option className="form-control" id="tipo_documento">Cédula extranjera</option>
                                </select>
                                <input type="number" min="1" className="form-control" id="documento_empleado" {...register('documento_empleado', { required: true })} />
                            </div>
                        </div>
                        <div className="row text-success d-flex mb-3">
                            <label for="nombre_empleado" className="form-label">Nombre del empleado</label>
                            <input type="text" className="form-control" id="nombre_empleado" {...register('nombre_empleado', { required: true })} />
                        </div>
                        <div className="row text-success d-flex  mb-3">
                            <label for="correo_empleado" className="form-label">Correo del empleado</label>
                            <input type="email" className="form-control" id="correo_empleado" {...register('correo_empleado', { required: true })} />
                        </div>
                        <div className="row text-success d-flex  mb-3">
                            <label for="contraseña_empleado" className="form-label">Contraseña del empleado</label>
                            <div className="input-group">
                                <input type="password" className="form-control" id="contraseña_empleado" {...register('contraseña_empleado', { required: true })} />
                            </div>
                        </div>
                        <div className="row text-success d-flex  mb-3">
                            <label for="telefono_empleado" className="form-label">Teléfono del empleado</label>
                            <div className="input-group">
                                <span className="input-group-text bg-success text-light">📱 604 / +57</span>
                                <input type="number" min="1" className="form-control" id="telefono_empleado" placeholder="Número de teléfono o celular" {...register('telefono_empleado', { required: true })} />
                            </div>
                        </div>
                        <div className="row text-success d-flex  mb-3">
                            <span>Rol del empleado</span>
                            <select for="rol_empleado" className="form-select" {...register('rol_empleado', { required: true })}>
                                <option className="form-control" id="rol_empleado">Administrador</option>
                                <option className="form-control" id="rol_empleado">Empleado</option>
                            </select>
                        </div>
                        <div className="row text-success d-flex  mb-3">
                            <label for="direccion_empleado" className="form-label">Dirección del empleado</label>
                            <input type="text" className="form-control" id="direccion_empleado" {...register('direccion_empleado', { required: true })} />
                        </div>

                        <br />
                        <div className='d-flex justify-content-center'>
                            <buttom type="submit" className="btn btn-success col-6" value="Crear">Registrar Empleado</buttom>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Default radio
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Default checked radio
                            </label>
                        </div>
                    </form>
                    <br />
                </div>
            </div>
        </div>
    </div>

</>
)

export default EditarEmpleado;