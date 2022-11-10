
//COMPONENTS
import React from 'react';
import Axios from "axios";
import * as yup from 'yup';
import { Formik } from 'formik';



const login = () => {

    const validationSchemaLogin = yup.object().shape({
        correo: yup.string().required("Ingrese un correo válido").email(),
        contraseña: yup.string().required("Ingrese su contraseña")
    })
    return (
        <Formik
            initialValues={{
                nombre: "",
                correo: "",
                contraseña: ""
            }}
            validationSchema={validationSchemaLogin}
            onSubmit={(values) => {

                Axios.post(
                    "https://api-celu.felipealvarez8.repl.co/api/users/auth",
                    {
                        nombre: values.nombre,
                        correo: values.correo,
                        contraseña: values.contraseña
                    }
                )
                    .then(function (res) {
                        console.log(res);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                console.log(values);
            }}
        >
        </Formik>
        
    )
}

export default login;