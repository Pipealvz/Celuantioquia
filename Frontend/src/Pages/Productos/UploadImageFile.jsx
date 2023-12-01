import { useEffect, useState } from "react";
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom";

const UploadImageFile = () => {

    //const [image, setImage] = useState(dataId);
    const { register, handleSubmit } = useForm();
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
    }, [id]);

    const uploadFile = () => {

        Axios.post('http://localhost:3306/uploadImage/product', {
            id_producto: id
        },)
            .then((res) => {
                console.log(res);
                // Alerta si se carga la imagen correctamente
                Swal.fire({
                    title: "Imagen cargada",
                    text: "La imagen fue cargada con exito",
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
                console.error(error)
                //Alerta si ocurre algun error al cargar la imagen
                Swal.fire({
                    title: "Error",
                    text: "No se pudo cargar la imagen",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    }

    return (
        <>
            <div className="modal-dialog bg-light modal-lg rounded">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className='text-success text-center text-uppercase fs-1'>Cargar Imagen</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="image-form" onSubmit={handleSubmit(uploadFile)}>
                            <div className="mb-3">
                                <label htmlFor="imagen" className="form-label">Selecciona o arrastra una imagen </label>
                                <input className="form-control" type="file" id="imagen" {...register('imagen', { required: true })} />
                            </div>
                            <input type="submit" value="Subir archivo" />
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default UploadImageFile;