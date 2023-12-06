import Axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


export default function EditarCategory  ({setDatosEditarCategoria})  {
    const { register, handleSubmit } = useForm();
    //const { empleados, setEmpleados } = useState();

    const categoryRegister = values => {

        console.log("Category register");
        Axios.post("https://celuantioqueno.onrender.com/categoria/actualizarCategoria", {
            id_categoria: setDatosEditarCategoria,
            nombre_categoria: values.nombre_categoria

        },

        )
            .then(function (res) {
                console.log(res);

                Swal.fire({
                    title: "Categoría registrada",
                    text: "Se actualizó la categoría exitosamente",
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
                    text: "No se pudo actualizar la categoría, intente de nuevo",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    };
    return (
        <div className="modal fade" id="modal-editCategoria" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className='container p-4 vh-auto border rounded shadow'>
                        <h2 className='text-success text-center text-uppercase fs-1'>Actualizar Categoría</h2>
                        <hr />
                        <form onSubmit={handleSubmit(categoryRegister)}>
                            <div className="row text-success d-flex mb-3">
                                <label htmlFor="nombre_categoria" className="form-label">Nombre de la categoría</label>
                                <input type="text" className="form-control" id="nombre_categoria" maxlength="30" {...register('nombre_categoria', { required: true })} />
                            </div>
                            <br />
                            <div className='d-flex justify-content-center'>
                                <input type="submit" className="btn btn-success col-6" value="Guardar cambios"/>
                            </div>
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )

}

