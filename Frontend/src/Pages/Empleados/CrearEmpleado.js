import React, { useEffect } from 'react';
import Axios from "axios";
import { useForm } from 'react-hook-form';
/* import { useState } from 'react'; */
import Swal from "sweetalert2";
import { useState } from 'react';
import './empleado.css';



const CrearEmpleado = () => {

    const { register, handleSubmit } = useForm();
    const [rol, setRol] = useState([]);
    const [documento, setDocumento] = useState([]);
    const [employForm, setEmployForm] = useState({
        nombre_empleado: '',
        documento_identidad: '',
        direccion_empleado: '',
        telefono_empleado: '',
        correo_empleado: '',
        contraseña_empleado: ''
    });

    /*     function MiComponente() {
            const [fechaNacimiento, setFechaNacimiento] = useState('');
    
            const handleFechaChange = event => {
                const nuevaFecha = event.target.value;
                setFechaNacimiento(nuevaFecha);
            };
        } */
    /*     const validarMayoriaEdad = fecha => {
            const fechaActual = new Date();
            const fechaIngresada = new Date(fecha);
            const edadMilisegundos = fechaActual - fechaIngresada;
            const edadAnios = edadMilisegundos / (1000 * 60 * 60 * 24 * 365.25);
    
            return edadAnios >= 18;
        }; */

    const handleCheckInputs = ({ target }) => {
        setEmployForm({ ...employForm, [target.id]: target.value });
        //console.log(target.value);
    }

    const getRoles = () => {
        Axios.post('https://celuantioqueno.onrender.com/rol/nuestrosRol')
            .then((response) => {
                setRol(response.data);
            })
    }

    const getDocumentos = () => {
        Axios.post('https://celuantioqueno.onrender.com/documento/nuestrosDocumentos')
            .then((response) => {
                setDocumento(response.data);
            })
    }

    const empleadoRegister = values => {
        Axios.post('https://celuantioqueno.onrender.com/empleado/crearEmpleado', {
            nombre_empleado: values.nombre_empleado,
            rol_empleado: values.rol_empleado,
            documento_identidad: values.documento_identidad,
            tipo_documento: values.tipo_documento,
            direccion_empleado: values.direccion_empleado,
            telefono_empleado: values.telefono_empleado,
            fecha_nacimiento_empleado: values.fecha_nacimiento_empleado,
            correo_empleado: values.correo_empleado,
            contraseña_empleado: values.contraseña_empleado
        })
            .then(function (res) {
                console.log(res);
                Swal.fire({
                    title: "Empleado registrado",
                    text: "Se registró el empleado exitosamente",
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
                Swal.fire({
                    title: "Error",
                    text: "No se pudo registrar el empleado, intente de nuevo",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    };

    useEffect(() => {
        getRoles();
        getDocumentos();
    }, []);

    return (
        <>
            <div className="modal-dialog bg-light modal-lg rounded">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className='text-success text-center text-uppercase fs-1'>Registrar Empleado</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(empleadoRegister)} onChange={handleCheckInputs}>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="nombre_empleado" className="form-label">Nombre del empleado</label>
                                    <input name="nombre_empleado" type="text" className={`form-control ${!employForm.nombre_empleado ? 'is-invalid' : 'is-valid'}`} maxLength="60" id="nombre_empleado" {...register('nombre_empleado', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="rol_empleado" className="form-label">Rol del Empleado</label>
                                    <select htmlFor="rol_empleado" className="form-select is-valid" {...register('rol_empleado', { required: true })}>
                                        <option className="form-control" value='' id="rol_empleado">Seleccione un rol</option>
                                        {rol.map(roles => {
                                            return (
                                                <option className="form-control is-valid" id="rol_empleado" key={roles.id_rol} value={roles.id_rol}>{roles.nombre_rol}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="documento_empleado" className="form-label">Documento de identidad</label>
                                    <input type="number" min="1" max="10000000000000" className={`form-control ${employForm.documento_identidad <= 0 ? 'is-invalid' : 'is-valid'}`} id="documento_identidad" {...register('documento_identidad', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="tipo_documento" className="form-label">Tipo de documento</label>
                                    <select className="form-select is-valid" {...register('tipo_documento', { required: true })}>
                                        <option className="form-control" id="tipo_documento" value=''>Seleccione un documento</option>
                                        {documento.map((document) => {
                                            return (
                                                <option className="form-control" id="tipo_documento" key={document.id_documento} value={document.id_documento}>{document.nombre_documento}</option>
                                            );
                                        })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="direccion_empleado" className="form-label">Dirección del empleado</label>
                                    <input type="text" className={`form-control ${!employForm.direccion_empleado ? 'is-invalid' : 'is-valid'}`} id="direccion_empleado" value={employForm.direccion_empleado} maxlength="50" {...register('direccion_empleado', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="telefono_empleado" className="form-label">Teléfono del empleado (604 / +57) </label>
                                    <input name="telefono_empleado" type="number" min="1" className={`form-control ${employForm.telefono_empleado <= 0 ? 'is-invalid' : 'is-valid'}`} id="telefono_empleado" placeholder="Número de teléfono o celular" {...register('telefono_empleado', { required: true })} />
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-100'>
                                    <label htmlFor="fecha_nacimiento_empleado" className="form-label">Fecha de nacimiento</label>
                                    <input type="date" className="form-control" id="fecha_nacimiento_empleado" {...register('fecha_nacimiento_empleado', { required: true })} />
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="correo_empleado" className="form-label">Correo del empleado</label>
                                    <input id="correo_empleado" type="email" className={`form-control ${!employForm.correo_empleado ? 'is-invalid' : 'is-valid'}`} {...register('correo_empleado', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="contraseña_empleado" className="form-label" >Contraseña del empleado</label>
                                    <input id="contraseña_empleado" type="password" className={`form-control ${!employForm.contraseña_empleado ? 'is-invalid' : 'is-valid'}`} maxLength="30" {...register('contraseña_empleado', { required: true })} />
                                </div>
                            </div>
                            <div className="text-center">
                                <input type="submit" value="Crear Empleado" className="btn btn-success mt-4 w-50" />
                            </div>
                            <br />
                        </form>
                    </div>
                </div >
            </div >
        </>
    )

}

export default CrearEmpleado;