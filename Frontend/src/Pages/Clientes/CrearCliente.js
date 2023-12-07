import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { useForm } from 'react-hook-form';
//import React, { useState } from 'react';
import Swal from "sweetalert2";
import './cliente.css'



const CrearCliente = () => {

    const { register, handleSubmit } = useForm();
    const [checkForm, setCheckForm] = useState({
        nombre_cliente: '',
        documento_cliente: '',
        direccion_vivienda: '',
        telefono_contacto: '',
        correo_cliente: '',
        contraseña_cliente: ''
    });

    const [rol, setRol] = useState([]);
    const [document, setDocument] = useState([]);

    const getDocs = () => {
        Axios.post('https://celuantioqueno.onrender.com/documento/nuestrosDocumentos')
            .then((res) => {
                setDocument(res.data);
                //console.log(res.data);
            });
    };
    const getCategory = () => {
        Axios.post('https://celuantioqueno.onrender.com/rol/nuestrosRol')
            .then((res) => {
                setRol(res.data);
                //console.log(res.data);
            });
    }

    const handleCheckInputs = ({ target }) => {
        setCheckForm({ ...checkForm, [target.name]: target.value });
        //console.log(target.value);
    }

    const clienteRegister = values => {

        console.log(values);
        Axios.post("https://celuantioqueno.onrender.com/cliente/crearCliente", {
            nombre_cliente: values.nombre_cliente,
            documento_cliente: values.documento_cliente,
            tipo_documento_cliente: values.tipo_documento_cliente,
            direccion_vivienda: values.direccion_vivienda,
            telefono_contacto: values.telefono_contacto,
            correo_cliente: values.correo_cliente,
            contraseña_cliente: values.contraseña_cliente,
            rol_cliente: values.rol_cliente
        },)
            .then(function (res) {
                console.log(res);
                Swal.fire({
                    title: "Empleado registrado",
                    text: "Se registró el cliente exitosamente",
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
                    text: "No se pudo registrar el cliente, intente de nuevo",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    };

    useEffect(() => {
        getDocs();
        getCategory();
    }, []);
    return (
        <>
            <div className="modal-dialog bg-light modal-lg rounded">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className='text-success text-center text-uppercase fs-1'>Crear cliente</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="producto-form" onSubmit={handleSubmit(clienteRegister)} onChange={handleCheckInputs}>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="nombre_cliente" className="form-label">Nombre del cliente</label>
                                    <input name='nombre_cliente' type="text" className={`form-control ${!checkForm.nombre_cliente ? 'is-invalid' : 'is-valid'}`} maxLength="60" id="nombre_producto" value={checkForm.nombre_cliente} {...register('nombre_cliente', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="documento_cliente" className="form-label">Documento de identidad</label>
                                    <input type="number" className={`form-control ${checkForm.documento_cliente <= 0 ? 'is-invalid' : 'is-valid'}`} value={checkForm.documento_cliente} min="1" id="documento_cliente"{...register('documento_cliente', { required: true })} />
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="tipo_documento_cliente" className="form-label">Tipo de documento</label>
                                    <select className="form-select is-valid" aria-label="Default select example" id="tipo_documento_cliente" {...register('tipo_documento_cliente', { required: true })} >
                                        <option value=''>Seleccione un documento</option>
                                        {!document ? 'No hay documentos disponibles' :
                                            document.map((item) => {
                                                return (
                                                    <option key={item.id_documento} value={item.id_documento}>{item.nombre_documento}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="direccion_vivienda" className="form-label">Dirección de vivienda</label>
                                    <input type="text" className={`form-control ${!checkForm.direccion_vivienda ? 'is-invalid' : 'is-valid'}`} value={checkForm.direccion_vivienda} id="direccion_vivienda" {...register('direccion_vivienda', { required: true })} />
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="telefono_contacto" className="form-label">Teléfono de contacto</label>
                                    <input type="number" min='1' className={`form-control ${checkForm.telefono_contacto <= 0 ? 'is-invalid' : 'is-valid'}`} value={checkForm.telefono_contacto} id="telefono_contacto" {...register('telefono_contacto', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="correo_cliente" className="form-label">Correo</label>
                                    <input type="email" className={`form-control ${!checkForm.correo_cliente ? 'is-invalid' : 'is-valid'}`} value={checkForm.correo_cliente} id="correo_cliente" {...register('correo_cliente', { required: true })} />
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="rol_cliente" className="form-label">Rol del cliente</label>
                                    <select className="form-select is-valid" aria-label="Default select example" id="rol_cliente" {...register('rol_cliente', { required: true })} >
                                        <option value=''>Seleccione un rol</option>
                                        {!rol ? 'No hay documentos disponibles' :
                                            rol.map((item) => {

                                                return (
                                                    <option key={item.id_rol} value={item.id_rol}>{item.nombre_rol}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="contraseña_cliente" className="form-label">Contraseña</label>
                                    <input type="password" className={`form-control ${!checkForm.contraseña_cliente ? 'is-invalid' : 'is-valid'}`} value={checkForm.contraseña_cliente} id="contraseña_cliente" {...register('contraseña_cliente', { required: true })} />
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

}

export default CrearCliente;