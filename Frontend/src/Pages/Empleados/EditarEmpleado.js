import Axios from "axios";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"



const EditarEmpleado = ({ id }) => {

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


    const handleCheckInputs = ({ target }) => {
        setEmployForm({ ...employForm, [target.id]: target.value });
        //console.log(target.value);
    }

    const getDocumentos = () => {
        Axios.post('https://celuantioqueno.onrender.com/documento/nuestrosDocumentos')
            .then((response) => {
                setDocumento(response.data);
            })
    }

    const getRoles = () => {
        Axios.post('https://celuantioqueno.onrender.com/rol/nuestrosRol')
            .then((response) => {
                setRol(response.data);
            })
    }

    const EditarEmpleado = values => {

        Axios.post('https://celuantioqueno.onrender.com/empleado/actualizarEmpleado', {
            id_empleado: id,
            rol_empleado: values.rol_empleado,
            direccion_empleado: values.direccion_empleado,
            telefono_empleado: values.telefono_empleado,
            correo_empleado: values.correo_empleado,
            contraseña_empleado: values.contraseña_empleado
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
                //             Alerta si ocurre algun error al crea el empleado 

                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar el empleado",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    }

    useEffect(() => {
        getDocumentos()
        getRoles();
    }, [])

    return (<>
        <>
            <div className="modal-dialog bg-light modal-lg rounded">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className='text-success text-center text-uppercase fs-1'>Editar Empleado</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(EditarEmpleado)} onChange={handleCheckInputs}>
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

    </>
    )
};


export default EditarEmpleado;