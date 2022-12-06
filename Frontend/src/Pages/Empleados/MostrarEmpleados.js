
import { useEffect, useState } from 'react';
import Navbar from '../Componets/Navbar';
import CrearEmpleado from './CrearEmpleado';
import EditarEmpleado from './EditarEmpleado';

const MostrarEmpleados = () => {

    const { empleados, setEmpleados } = useState();

    const getEmpleados = async () => {
        try {
            const res = await fetch(
                "https://"
            );
            // console.log(res);
            const datos = await res.json();
            setEmpleados(datos);
            console.log(datos);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getEmpleados();
    });

    return (<>
        <Navbar />
        <div className='container p-4 vh-auto border rounded shadow'>
            <h2 className='text-success text-center text-uppercase fs-1'>Lista de Empleado</h2>
            <hr />
            {
                empleados.map(item => {
                    return (
                        <div className="card" key={item.id_empleado}>
                            <div className="row d-flex card-body">
                                <div id="nombre_empleado" className="fw-bold col-7 fs-5"> {item.nombre_empleado} </div>
                                <div className="row col-4 d-flex justify-content-between">
                                            <div
                                                id="btn-editEmpleado"
                                                className="btn btn-warning col-5"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modal-editar-empleado"
                                            >
                                                Editar empleado
                                            </div>
                                            <EditarEmpleado />
                                    <button className="btn btn-danger col-5">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="container">
                <div className="row-fluid mt-4 justify-content-center d-flex">
                    <div
                        id="btn-crelote"
                        className="btn btn-success col-lg-4 col-12"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-empleado"
                    >
                        Agregar empleado
                    </div>
                </div>
            </div>
            <CrearEmpleado />
        </div>
    </>
    )

}

export default MostrarEmpleados;