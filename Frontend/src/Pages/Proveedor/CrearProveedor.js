import Axios from 'axios';
import React, { memo, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import Navbar from '../../Pages/Componets/sidebar';
import { VscPass, VscError } from 'react-icons/vsc';
import './proveedor_styles.css';


const CrearProveedor = memo(() => {

    const { register, handleSubmit } = useForm();
    const [inputValue, setInputValue] = useState({
        nombre_proveedor: '',
        correo_proveedor: '',
        contacto_proveedor: '',
        nit_proveedor: '',
        direccion_proveedor: ''

    });

    const isFieldValid = (event) => event === '';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...setInputValue,
            [name]: value
        });
        setInputValue(value);
        isFieldValid(e)
        //console.log(tempValue)
    };

    const createProveedor = values => {

        //Se llama el enlace dle servicio y se le asiganan los valores al 
        //objeto que se con datos ingresasos en el formulario

        Axios.post("http://localhost:3306/proveedor/crearProveedor", {
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
        <div className='d-flex'>
            <Navbar />
            <div className=' container shadow-lg ' style={{ padding: '4rem', margin: '6rem 10rem 3rem 10rem', borderRadius: '1rem' }}>
                <div className='container vh-100'>
                    <h2 className='text-success text-center text-uppercase fs-1'>Crear Proveedor</h2>
                    <hr />

                    <form className="proveedor-form" onChange={handleInputChange} onSubmit={handleSubmit(createProveedor)}>
                        <div className="row text-success d-flex col-12 mb-3">
                            <label for="nombre_proveedor" className="col-6 form-label">Nombre del proveedor</label>
                            <div className='d-flex col-12'>
                                <input value={inputValue.nombre_proveedor} type="text" className="form-control" id="nombre_proveedor" maxLength="40" {...register('nombre_proveedor', { required: true })} />
                                {
                                    inputValue.nombre_proveedor === ''
                                        ?
                                        <h3 className='ms-2 icon' id='icon-error-vsc'><VscError /></h3>
                                        :
                                        <h3 className='ms-2 icon' id='icon-success-vsc'><VscPass /></h3>
                                }
                            </div>
                        </div>
                        <div className="row text-success d-flex col-12 mb-3">
                            <label for="correo_proveedor" className="col-6 form-label">Correo del Proveedor</label>
                            <div className='d-flex col-12'>
                                <input value={inputValue.correo_proveedor} type="email" className="form-control" id="correo_proveedor" maxLength="50"{...register('correo_proveedor', { required: true })} />
                                {
                                    inputValue.correo_proveedor === ''
                                        ?
                                        <h3 className='ms-2 icon' id='icon-error-vsc'><VscError /></h3>
                                        :
                                        <h3 className='ms-2 icon' id='icon-success-vsc'><VscPass /></h3>
                                }
                            </div>
                        </div>
                        <div className="row text-success d-flex  mb-3">
                            <label for="contacto_proveedor" className="form-label">Contacto del proveedor</label>
                            <div className='d-flex col-12'>
                                <input value={inputValue.contacto_proveedor} type="number" min="1" max="9999999999" className="form-control" id="contacto_proveedor"{...register('contacto_proveedor', { required: true })} />
                                {
                                    inputValue.contacto_proveedor === ''
                                        ?
                                        <h3 className='ms-2 icon' id='icon-error-vsc'><VscError /></h3>
                                        :
                                        <h3 className='ms-2 icon' id='icon-success-vsc'><VscPass /></h3>
                                }
                            </div>
                            <p>Según el indicativo, ingresa el número (Medellín: 604) (Colombia: +57)</p>
                        </div>
                        <div className="row text-success d-flex  mb-3">
                            <label for="nit_proveedor" className="form-label">Nit del proveedor</label>
                            <div className='d-flex col-12'>
                                <input value={inputValue.nit_proveedor} type="number" min="1" className="form-control" id="nit_proveedor" max="999999999" {...register('nit_proveedor', { required: true })} />
                                {
                                    inputValue.contacto_proveedor === ''
                                        ?
                                        <h3 className='ms-2 icon' id='icon-error-vsc'><VscError /></h3>
                                        :
                                        <h3 className='ms-2 icon' id='icon-success-vsc'><VscPass /></h3>
                                }
                            </div>
                        </div>
                        <div className="row text-success d-flex  mb-3">
                            <label for="direccion_proveedor" className="form-label">Dirección del proveedor</label>
                            <div className='d-flex col-12'>
                                <input value={inputValue.direccion_proveedor} type="text" className="form-control text-area" id="direccion_proveedor" {...register('direccion_proveedor', { required: true })}></input>
                                {
                                    inputValue.contacto_proveedor === ''
                                        ?
                                        <h3 className='ms-2 icon' id='icon-error-vsc'><VscError /></h3>
                                        :
                                        <h3 className='ms-2 icon' id='icon-success-vsc'><VscPass /></h3>
                                }
                            </div>
                        </div>
                        <br />
                        <div className="col text-center">
                            <input type="submit" value="Crear Proveedor" className="btn btn-success mt-4 mb-4" />
                        </div>
                        <br />
                    </form>

                </div>
            </div>
        </div>
    )

});

export default CrearProveedor;