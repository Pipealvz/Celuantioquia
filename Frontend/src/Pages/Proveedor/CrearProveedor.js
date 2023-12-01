import Axios from 'axios';
import React, { memo, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import './proveedor_styles.css';


const CrearProveedor = memo(() => {

    const { register, handleSubmit } = useForm();
    const [checkForm, setCheckForm] = useState({
        nombre_proveedor: '',
        correo_proveedor: '',
        contacto_proveedor: '',
        nit_proveedor: '',
        direccion_proveedor: ''
    });

    const handleCheckInputs = ({ target }) => {
        setCheckForm({ ...checkForm, [target.name]: target.value });
        console.log(target.value);
    }

    const createProveedor = values => {

        //Se llama el enlace del servicio y se le asignan los valores al 
        //objeto que se con datos ingresasos en el formulario

        Axios.post("https://celuantioqueno.onrender.com/proveedor/crearProveedor", {
            nombre_proveedor: values.nombre_proveedor,
            correo_proveedor: values.correo_proveedor,
            contacto_proveedor: values.contacto_proveedor,
            nit_proveedor: values.nit_proveedor,
            direccion_proveedor: values.direccion_proveedor
        },
        )
            .then(function (res) {
                console.log(res);
                //             Alerta si se crea el Proveedor correctamente
                Swal.fire({
                    title: "Proceso exitoso",
                    text: "Proveedor creado con exito",
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
                    text: "No se pudo crear el Proveedor",
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
                        <h2 className='text-success text-center text-uppercase fs-1'>Crear proveedor</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="producto-form" onSubmit={handleSubmit(createProveedor)} onChange={handleCheckInputs}>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="nombre_proveedor" className="form-label">Nombre del proveedor</label>
                                    <input name="nombre_proveedor" type="text" className={`form-control ${!checkForm.nombre_proveedor ? 'is-invalid' : 'is-valid'}`} maxlength="60" id="nombre_proveedor" value={checkForm.nombre_proveedor} {...register('nombre_proveedor', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="correo_proveedor" className="form-label">Correo del proveedor</label>
                                    <input type="email" className={`form-control ${!checkForm.correo_proveedor ? 'is-invalid' : 'is-valid'}`} value={checkForm.correo_proveedor} id="correo_proveedor" {...register('correo_proveedor', { required: true })} />
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-50'>
                                    <label htmlFor="contacto_proveedor" className="form-label">Teléfono del proveedor</label>
                                    <input name="contacto_proveedor" type="number" className={`form-control ${!checkForm.contacto_proveedor ? 'is-invalid' : 'is-valid'}`} id="contacto_proveedor" value={checkForm.contacto_proveedor} {...register('contacto_proveedor', { required: true })} />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="nit_proveedor" className="form-label">Nit del proveedor</label>
                                    <input type="number" className={`form-control ${!checkForm.nit_proveedor ? 'is-invalid' : 'is-valid'}`} value={checkForm.nit_proveedor} min='1000000000' max='9999999999' id="nit_proveedor" {...register('nit_proveedor', { required: true })} />
                                </div>
                            </div>
                            <div className="row text-success d-flex mb-3">
                                <div className='w-100'>
                                    <label htmlFor="direccion_proveedor" className="form-label">Dirección del proveedor</label>
                                    <input type="text" className={`form-control ${!checkForm.direccion_proveedor ? 'is-invalid' : 'is-valid'}`} value={checkForm.direccion_proveedor} id="direccion_proveedor" {...register('direccion_proveedor', { required: true })} />
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
        // <div className='d-flex'>
        //     <Navbar />
        //     <div className=' container shadow-lg ' style={{ padding: '4rem', margin: '6rem 10rem 3rem 10rem', borderRadius: '1rem' }}>
        //         <div className='container vh-100'>
        //             <h2 className='text-success text-center text-uppercase fs-1'>Crear Proveedor</h2>
        //             <hr />

        //             <form className="proveedor-form" onChange={handleInputChange} onSubmit={handleSubmit(createProveedor)}>
        //                 <div className="row text-success d-flex col-12 mb-3">
        //                     <label for="nombre_proveedor" className="col-6 form-label">Nombre del proveedor</label>
        //                     <div className='d-flex col-12'>
        //                         <input value={inputValue.nombre_proveedor} type="text" className="form-control" id="nombre_proveedor" maxLength="40" {...register('nombre_proveedor', { required: true })} />
        //                         {
        //                             inputValue.nombre_proveedor === ''
        //                                 ?
        //                                 <h3 className='ms-2 icon' id='icon-error-vsc'><VscError /></h3>
        //                                 :
        //                                 <h3 className='ms-2 icon' id='icon-success-vsc'><VscPass /></h3>
        //                         }
        //                     </div>
        //                 </div>
        //                 <div className="row text-success d-flex col-12 mb-3">
        //                     <label for="correo_proveedor" className="col-6 form-label">Correo del Proveedor</label>
        //                     <div className='d-flex col-12'>
        //                         <input value={inputValue.correo_proveedor} type="email" className="form-control" id="correo_proveedor" maxLength="50"{...register('correo_proveedor', { required: true })} />
        //                         {
        //                             inputValue.correo_proveedor === ''
        //                                 ?
        //                                 <h3 className='ms-2 icon' id='icon-error-vsc'><VscError /></h3>
        //                                 :
        //                                 <h3 className='ms-2 icon' id='icon-success-vsc'><VscPass /></h3>
        //                         }
        //                     </div>
        //                 </div>
        //                 <div className="row text-success d-flex  mb-3">
        //                     <label for="contacto_proveedor" className="form-label">Contacto del proveedor</label>
        //                     <div className='d-flex col-12'>
        //                         <input value={inputValue.contacto_proveedor} type="number" min="1" max="9999999999" className="form-control" id="contacto_proveedor"{...register('contacto_proveedor', { required: true })} />
        //                         {
        //                             inputValue.contacto_proveedor === ''
        //                                 ?
        //                                 <h3 className='ms-2 icon' id='icon-error-vsc'><VscError /></h3>
        //                                 :
        //                                 <h3 className='ms-2 icon' id='icon-success-vsc'><VscPass /></h3>
        //                         }
        //                     </div>
        //                     <p>Según el indicativo, ingresa el número (Medellín: 604) (Colombia: +57)</p>
        //                 </div>
        //                 <div className="row text-success d-flex  mb-3">
        //                     <label for="nit_proveedor" className="form-label">Nit del proveedor</label>
        //                     <div className='d-flex col-12'>
        //                         <input value={inputValue.nit_proveedor} type="number" min="1" className="form-control" id="nit_proveedor" max="999999999" {...register('nit_proveedor', { required: true })} />
        //                         {
        //                             inputValue.contacto_proveedor === ''
        //                                 ?
        //                                 <h3 className='ms-2 icon' id='icon-error-vsc'><VscError /></h3>
        //                                 :
        //                                 <h3 className='ms-2 icon' id='icon-success-vsc'><VscPass /></h3>
        //                         }
        //                     </div>
        //                 </div>
        //                 <div className="row text-success d-flex  mb-3">
        //                     <label for="direccion_proveedor" className="form-label">Dirección del proveedor</label>
        //                     <div className='d-flex col-12'>
        //                         <input value={inputValue.direccion_proveedor} type="text" className="form-control text-area" id="direccion_proveedor" {...register('direccion_proveedor', { required: true })}></input>
        //                         {
        //                             inputValue.contacto_proveedor === ''
        //                                 ?
        //                                 <h3 className='ms-2 icon' id='icon-error-vsc'><VscError /></h3>
        //                                 :
        //                                 <h3 className='ms-2 icon' id='icon-success-vsc'><VscPass /></h3>
        //                         }
        //                     </div>
        //                 </div>
        //                 <br />
        //                 <div className="col text-center">
        //                     <input type="submit" value="Crear Proveedor" className="btn btn-success mt-4 mb-4" />
        //                 </div>
        //                 <br />
        //             </form>

        //         </div>
        //     </div>
        // </div>
    )

});

export default CrearProveedor;