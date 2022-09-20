
import React, { Component } from 'react';
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from '../Logo.png';
import css from '../Css/index.css';

class Login extends Component {
    render() {
        return (<div>

            <div className='bg-success row centro shadow-lg'>

                <div className='col imagen' style={{
                    backgroundColor: '#7FB77E',
                    borderRadius: '1rem',
                    height: '35rem'
                }}>
                    <img src={Logo} class="img-fluid" style={{ margin: '5rem' }} alt="..." />
                </div>

                <div className='col' >

                <Container className="py-4">
                <Row className="justify-content-center">

                    <Tabs justify variant="pills" defaultActiveKey="tab-1" className="mb-1 p-0 text-light"  style={{  borderRadius: '1rem'}}>
                        <Tab eventKey="tab-1" title="Ingresar">
                                
                        <center><div className='container text-light'>
                        <h1 >Bienvenido</h1>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <input type="text" style={{ width: '20rem' }} className="form-control" id="Usuario" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" >Contraseña</label>
                                <input type="text" style={{ width: '20rem' }} className="form-control" id="contraseña" />
                            </div>
                            <center><button type="submit" style={{ backgroundColor: '#146356', margin: '1rem' }} className="btn text-light  btn-lg">Ingresar</button></center>
                        </form>

                    </div></center>

                        </Tab>

                        <Tab eventKey="tab-2" title="Registrese">
                        <center><div className='container text-light'>
                        <h1 >Registro</h1>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input type="text" style={{ width: '20rem' }} className="form-control" id="Usuario" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" >Correo</label>
                                <input type="text" style={{ width: '20rem' }} className="form-control" id="contraseña" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" >Contraseña</label>
                                <input type="text" style={{ width: '20rem' }} className="form-control" id="contraseña" />
                            </div>
                            <center><button type="submit" style={{ backgroundColor: '#146356', margin: '1rem' }} className="btn text-light  btn-lg">Enviar</button></center>
                        </form>

                    </div></center>
                        </Tab>
                        
                    </Tabs>

                </Row>
            </Container>

                </div>

            </div>
            
        </div>


        );
    }
}

export default Login;