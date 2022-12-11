// import { Axios } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Axios from "axios";

const CrearCategoria = () => {
    const { register, handleSubmit } = useForm();

    const categoriaRegister = values => {

        console.log("Category register");
        Axios.post("https://celuantioqueno.onrender.com/categoria/crearCategoria", {
            // nombre_categoria, tipo_categoria, prioridad_categoria
            nombre_categoria: values.nombre_categoria,
            tipo_categoria: values.tipo_categoria,
            prioridad_categoria: values.prioridad_categoria

        },

        )
            .then(function (res) {
                console.log(res);

                Swal.fire({
                    title: "Categoría registrada",
                    text: "Se registró la categoría exitosamente",
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
                    text: "No se pudo registrar la categoría, intente de nuevo",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    };
    return (
        <div className="modal fade" id="modal-category" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className='container p-4 vh-auto border rounded shadow'>
                        <h2 className='text-success text-center text-uppercase fs-1'>Registrar Empleado</h2>
                        <hr />
                        <form onSubmit={handleSubmit(categoriaRegister)}>
                            <div className="row text-success d-flex mb-3">
                                <label htmlFor="nombre_categoria" className="form-label">Nombre de la categoría</label>
                                <input type="text" className="form-control" id="nombre_categoria" maxlength="30" {...register('nombre_categoria', { required: true })} />
                            </div>
                            <div className="row text-success d-flex  mb-3">
                                <label htmlFor="tipo_categoria" className="form-label">Tipo de categoría</label>
                                <select htmlFor="tipo_categoria" className="form-select"  {...register('tipo_categoria', { required: true })} >
                                    <option className="form-control" id="tipo_categoria" value="Dispositivos móviles">Dispositivos móviles</option>
                                    <option className="form-control" id="tipo_categoria" value="Computadores">Computadores</option>
                                    <option className="form-control" id="tipo_categoria" value="Perifericos">Perifericos</option>
                                </select>
                            </div>
                            <div className="row text-success d-flex  mb-3">
                                <span>Prioridad de la categoría</span>
                                <select htmlFor="prioridad_categoria" className="form-select" {...register('prioridad_categoria', { required: true })}>
                                    <option className="form-control" id="prioridad_categoria" value="1">Alta</option>
                                    <option className="form-control" id="prioridad_categoria" value="2">Media</option>
                                    <option className="form-control" id="prioridad_categoria" value="3">Baja</option>
                                </select>
                            </div>
                            <br />
                            <div className='d-flex justify-content-center'>
                            <input type="submit" className="btn btn-success col-6" value="Registrar Categoria"/>
                            </div>
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CrearCategoria;