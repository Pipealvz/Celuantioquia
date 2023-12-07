import { useEffect, useState } from "react";
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import SpinnerGrow from "../SpinnerGrow";

const UploadImageFile = () => {

    const [image, setImage] = useState();

    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const [isLoading, setisLoading] = useState(true);
    //const { register, handleSubmit } = useForm();
    const { id } = useParams();

    const getAllProductos = async () => {
        await Axios.post('https://celuantioqueno.onrender.com/producto/productoPorId', { id_producto: id })
            .then((response) => {
                setImage(response.data);
                setisLoading(false);
            });
    }

    useEffect(() => {
        getAllProductos();
    }, [id]);

    const uploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('imagen', file);
        try {
            const res = await Axios.post('https://celuantioqueno.onrender.com/uploadImage/product', { id_producto: id },)
            if (res.status === 200) {
                setImageUrl(res.data.imageUrl);
                Swal.fire({
                    title: "Imagen cargada",
                    text: "La imagen fue cargada con exito",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                }).then((res) => {
                    if (res.isConfirmed === true) {
                        console.log('OK');
                    }
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo cargar la imagen",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }

        } catch (error) {
            return 'we have an error, sorry!'
        }
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
    };


    return (
        <>
            {isLoading === true
                ? <SpinnerGrow />
                :
                <div className="modal-dialog bg-light modal-lg rounded">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className='text-success text-center text-uppercase fs-1'>Cargar Imagen</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="image-form" onSubmit={uploadFile()}>
                                <div className="mb-3">
                                    <label htmlFor="imagen" className="form-label">Selecciona o arrastra una imagen </label>
                                    <input className="form-control" name="imagen" type="file" id="imagen" onChange={handleInputChange} />
                                </div>
                                <input type="submit" value="Subir archivo" />
                            </form>
                            <div className="img-fluid">
                                {!imageUrl ? 'No existe' :
                                    imageUrl && <img src={imageUrl} alt="" srcset="" />
                                }
                            </div>
                        </div>
                    </div >
                </div >
            }
        </>
    )
}

export default UploadImageFile;