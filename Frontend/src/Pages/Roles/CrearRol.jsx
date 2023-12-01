import Axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import './rol.css'

const CrearRol = () => {

    const { register, handleSubmit } = useForm();
    const [checkForm, setCheckForm] = useState({
        nombre_rol: '',
        estado_rol: ''
    });

    const handleCheckInputs = ({ target }) => {
        setCheckForm({ ...checkForm, [target.name]: target.value });
        console.log(target.value);
    }

    const createRol = values => {

        //Se llama el enlace del servicio y se le asignan los valores al 
        //objeto que se con datos ingresasos en el formulario

        Axios.post("https://celuantioqueno.onrender.com/rol/crearRol", {
            nombre_rol: values.nombre_rol,
            estado_rol: values.estado_rol
        },
        )
            .then(function (res) {
                console.log(res);
                //             Alerta si se crea el Proveedor correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "Rol creado con exito",
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
                        <h2 className='text-success text-center text-uppercase fs-1'>Crear Rol</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="producto-form" onSubmit={handleSubmit(createRol)} onChange={handleCheckInputs}>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="nombre_rol" className="form-label">Nombre del proveedor</label>
                                    <input name="nombre_rol" type="text" className={`form-control ${!checkForm.nombre_rol ? 'is-invalid' : 'is-valid'}`} maxlength="60" id="nombre_rol" value={checkForm.nombre_rol} {...register('nombre_rol', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="estado_rol" className="form-label">Tipo del produto</label>
                                    <select className="form-select is-valid" aria-label="Default select example" id="estado_rol" {...register('estado_rol', { required: true })} >
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

export default CrearRol;