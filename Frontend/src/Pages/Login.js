//COMPONENTS
import React from 'react';
import Axios from "axios";
// import * as yup from "yup";
// import login from "./Controllers/login.controller";
//COMPLEMENTS
import { useForm } from "react-hook-form"
// import { useEffect } from "react";
//import React, { useState } from 'react';
// import { Formik, Form, Field } from "formik";
//import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
//import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../Logo.png";
import "../Css/index.css";

// const isFailedEmpty = () => {
//     return (
//         <div className="text-small text-light text-start m-0">
//             Este campo requiere un valor
//         </div>
//     );
// };

// const isRequired = "Campo obligatorio";
// const validationSchema = yup.object().shape({
//     //nombre: yup.string().required(isRequired),
//     correo: yup.string().required(isRequired).email(),
//     contraseña: yup.string().required(isRequired).min(10),
// });
// // yup.object().shape({    nombre: yup.string().required()})

// const getData = async () => {
//     console.log(document.getElementById("user").value);
// };
const Login = () => {

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // let login = false;
    // let SingUp = false;

    // const esLogin = () => login = true; SingUp = false; console.log(login);
    // const esSingUp = () => login = false; SingUp = true; console.log("Es singUP")

    const { register, handleSubmit } = useForm();


    const onLogin = values => {

        console.log("EsLogin");
        Axios.post("http://localhost:3306/auth/login", {
            correo: values.correo,
            contrasena: values.contrasena
        },
            // , { headers: { 'Content-Type': 'application/x-www-form-urlencoded' },}
        )
            .then(function (res) {
                console.log(res);
                Swal.fire({
                    title: "Bienvenido",
                    text: "Te logueaste exitosamente",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                }).then((res) => {
                    if (res.isConfirmed === true || res !== null) {
                        window.location.assign("/Home");
                    }
                });
            })
            .catch(function (error) {
                console.log(error);

                Swal.fire({
                    title: "Error",
                    text: "Revise que tu nombre de usuario y contraseña esten correctos",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
        console.log(values);
    };


    return (

        <div className="row w-100 align-items-center">

            <div className="col text-center cajainfo shadow-lg bg-success ">
                <img src={Logo} className="logo img-responsive center-block" alt="..." />
            </div>

            <div className="col text-center cajalog shadow-lg mt-5">
                <div className="forms-container">

                    {/* FORMULARIO LOGIN */}

                    <div className="Login-register">
                        <form className="login-form" onSubmit={handleSubmit(onLogin)}>
                            <h2 className="mt-3 ">Iniciar Sesión</h2>
                            <div className="input-field">
                                <input type="email" className="form-control mt-4 mb-4" maxlength="50" placeholder="Correo" {...register('correo', { required: true })} />
                            </div>
                            <div className="input-field">
                                <input type="password" className="form-control mt-4 mb-4" maxlength="50" placeholder="Contraseña" {...register('contrasena', { required: true })} />
                            </div>

                            <div className="row w-100 align-items-center">
                                <div className="col text-center">
                                    <input type="submit" value="Iniciar Sesión" className="btn btn-success mt-4 mb-4" />
                                </div>
                                <div className="col text-center">
                                    <Link id="register_button" className="text-success mb-2" to="/Registro">
                                        Registrarse
                                    </Link>
                                </div>
                            </div>

                        </form>

                        {/* <Modal show={show} onHide={handleClose}> */}

                        {/* FORMULARIO SINGUP */}

                        {/* </Modal> */}
                    </div>
                </div>

            </div>
        </div>

    );
    // }

}
export default Login;
