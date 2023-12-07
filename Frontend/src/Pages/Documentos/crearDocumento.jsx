import Axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import './documento.css'

const CrearDocumento = () => {

    const { register, handleSubmit } = useForm();
    const [checkForm, setCheckForm] = useState({
        nombre_documento: '',
        estado_documento: ''
    });

    const handleCheckInputs = ({ target }) => {
        setCheckForm({ ...checkForm, [target.name]: target.value });
        console.log(target.value);
    }

    const createDocumento = values => {

        //Se llama el enlace del servicio y se le asignan los valores al 
        //objeto que se con datos ingresasos en el formulario

        Axios.post("https://celuantioqueno.onrender.com/documento/crearDocumento", {
            nombre_documento: values.nombre_documento,
            estado_documento: values.estado_documento
        },
        )
            .then(function (res) {
                console.log(res);
                //             Alerta si se crea el Documento correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "Documento creado con exito",
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
                //             Alerta si ocurre algun error al crea el Documento 
                Swal.fire({
                    title: "Error",
                    text: "No se pudo crear el rol",
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
                        <h2 className='text-success text-center text-uppercase fs-1'>Crear Tipo de Documento</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="producto-form" onSubmit={handleSubmit(createDocumento)} onChange={handleCheckInputs}>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="nombre_documento" className="form-label">Tipo de documento</label>
                                    <input name="nombre_documento" type="text" className={`form-control ${!checkForm.nombre_documento ? 'is-invalid' : 'is-valid'}`} maxlength="60" id="nombre_documento" value={checkForm.nombre_documento} {...register('nombre_documento', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="estado_documento" className="form-label">Estado del documento</label>
                                    <select className="form-select is-valid" aria-label="Default select example" id="estado_documento" {...register('estado_documento', { required: true })} >
                                        <option value='1'>Activo</option>
                                        <option value='0'>Inactivo</option>
                                    </select>
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
    )
}

export default CrearDocumento;