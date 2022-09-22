//COMPONENTS
import React from 'react';
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import Axios from "axios";
import * as yup from 'yup';
import login from './login.controller'
//COMPLEMENTS
import { Formik, Form, Field } from 'formik';
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2'
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Logo.png';
import '../Css/index.css';

const Login = () => {
    /*const getData = async () => {
        const data = await fetch('https://api-celu.felipealvarez8.repl.co/api/users')
        console.log(data);
    }
    useEffect(() => {
        getData()
    }, [])*/



    const isCorrect = () => {
        Swal.fire({
            title: "Usuario creado",
            text: "Se ha registrado correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
        }).then((res) => {
            if (res.isConfirmed === true) {
                window.location.reload(true);
            }
        });
    }

    const isFailed = () => {
        Swal.fire({
            title: "Error",
            text: "No se pudo registrar correctamente. Revise los campos",
            icon: "error",
            confirmButtonText: "Aceptar",
        });
    }

    const isFailedEmpty = () => {
        return <div class="alert alert-danger" style={{width:'15rem',padding:'0rem'}} role="alert">Este campo requiere un valor
</div>
    }

    const isRequired = "Campo obligatorio"
    const validationSchema = yup.object().shape({
        nombre: yup.string().required(isRequired),
        correo: yup.string().required(isRequired).email(),
        contraseña: yup.string().required(isRequired).min(10)
    })
    // yup.object().shape({    nombre: yup.string().required()})
    return (
        <Formik
            initialValues={{
                nombre: "",
                correo: "",
                contraseña: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {

                Axios.post(
                    "https://api-celu.felipealvarez8.repl.co/api/users/new",
                    {
                        nombre: values.nombre,
                        correo: values.correo,
                        contraseña: values.contraseña
                    }
                )
                    .then(function (res) {
                        console.log(res);

                        isCorrect();
                    })
                    .catch(function (error) {
                        console.log(error);
                        isFailed();
                    });
                console.log(values);

            }}
        >

            {({ values, handleSubmit, handleChange, touched, errors, handleBlur }) => (
                <div>
                    <div className='bg-success row centro shadow-lg mt-2'>
                        <div className='col imagen' style={{
                            backgroundColor: '#7FB77E',
                            borderRadius: '1rem',
                            height: '39rem'
                        }}>
                            <img src={Logo} className="img-fluid" style={{ margin: '5rem' }} alt="..." />
                        </div>

                        <div className='col' >

                            <Container className="py-4">
                                <Row className="justify-content-center">

                                    <Tabs justify variant="pills" defaultActiveKey="tab-1" className="mb-1 p-0 text-light" style={{ borderRadius: '1rem' }}>
                                        <Tab eventKey="tab-1" title="Ingresar">

                                            <center><div className='container text-light'>
                                                <h1 >Bienvenido</h1>
                                                <Form onSubmit={login}>
                                                    <div className="mb-3">
                                                        <label className="form-label">Usuario</label>
                                                        <Field
                                                            type="text"
                                                            className="form-control"
                                                            name="nombreIngresa"
                                                            id="userIngresa"
                                                            placeholder="Ingrese su nombre."
                                                            style={{ width: '20rem' }}
                                                            value={values.nombre}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {touched.nombre && errors.nombre && isFailedEmpty()}
                                                    <div className="mb-3">
                                                        <label className="form-label" >Contraseña</label>
                                                        <Field
                                                            type="password"
                                                            className="form-control"
                                                            name="contraseñaIngresa"
                                                            id="passwordIngresa"
                                                            placeholder="Ingrese su contraseña."
                                                            style={{ width: '20rem' }}
                                                            value={values.contraseña}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} />
                                                    </div>
                                                    {touched.contraseña && errors.contraseña && isFailedEmpty()}
                                                    <center><button type="submit" style={{ backgroundColor: '#146356', margin: '1rem' }} className="btn text-light  btn-lg">Ingresar</button></center>
                                                </Form>

                                            </div></center>

                                        </Tab>


                                        <Tab eventKey="tab-2" title="Registrese">
                                            <center><div className='container text-light'>
                                                <h1 >Registro</h1>
                                                <Form onSubmit={handleSubmit}>
                                                    <div className="mb-3">
                                                        <label className="form-label">Nombre</label>
                                                        <Field type="text"
                                                            className="form-control"
                                                            name="nombre"
                                                            id="user"
                                                            placeholder="Ingrese su nombre."
                                                            style={{ width: '20rem' }}
                                                            value={values.nombre}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {touched.nombre && errors.nombre && isFailedEmpty()}
                                                    <div className="mb-3">
                                                        <label className="form-label" >Correo</label>
                                                        <Field
                                                            type="email"
                                                            className="form-control"
                                                            name="correo"
                                                            id="email"
                                                            placeholder="Ingrese su correo."
                                                            style={{ width: '20rem' }}
                                                            value={values.correo}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {touched.correo && errors.correo && isFailedEmpty()}
                                                    <div className="mb-3">
                                                        <label className="form-label" >Contraseña</label>
                                                        <Field
                                                            type="password"
                                                            className="form-control"
                                                            name="contraseña"
                                                            id="password"
                                                            placeholder="Ingrese su contraseña."
                                                            style={{ width: '20rem' }}
                                                            value={values.contraseña}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {touched.contraseña && errors.contraseña && isFailedEmpty()}
                                                    <center><Button type="submit" style={{ backgroundColor: '#146356', margin: '1rem' }} className="btn text-light  btn-lg">Enviar</Button></center>
                                                </Form>

                                            </div></center>
                                        </Tab>

                                    </Tabs>

                                </Row>
                            </Container>

                        </div>

                    </div>

                </div>
            )}


        </Formik>
    );
}

export default Login;