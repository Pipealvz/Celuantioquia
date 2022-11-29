
import { useForm } from 'react-hook-form';
import Navbar from '../Pages/Componets/Navbar';
import Swal from "sweetalert2";
import Axios from "axios";



const CrearEmpleado = () => {

    const { register, handleSubmit } = useForm();

    const empleadoRegister = values => {

        debugger;

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
            rol_empleado: values.rol_empleado,

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

    return (<>
        <div className="modal fade" id="modal-empleado" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className='container p-4 vh-auto border rounded shadow'>
                        <h2 className='text-success text-center text-uppercase fs-1'>Registrar Empleado</h2>
                        <hr />
                        <form onSubmit={handleSubmit(empleadoRegister)}>
                            <div className="row text-success d-flex  mb-3">
                                <label for="documento_empleado" className="form-label">Documento de identidad</label>
                                <div className="input-group">
                                    <select className="input-group-text bg-success text-light">
                                        <option className="form-control" id="tipo_documento" {...register('tipo_documento', { required: true })}>Cédula ciudadana</option>
                                        <option className="form-control" id="tipo_documento" {...register('tipo_documento', { required: true })}>Cédula extranjera</option>
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
                                <select for="rol_empleado" className="form-select">
                                    <option className="form-control" id="rol_empleado" {...register('rol_empleado', { required: true })}>Administrador</option>
                                    <option className="form-control" id="rol_empleado" {...register('rol_empleado', { required: true })}>Empleado</option>
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
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        </div>

    </>
    )

}

export default CrearEmpleado;