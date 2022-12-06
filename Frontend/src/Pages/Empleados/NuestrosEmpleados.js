//import { Axios } from 'axios';
import React, { useEffect, useState } from 'react';

import Navbar from '../Componets/Navbar';
import img from '../../images/asd.jpg'

const NuestrosEmpleados = (() => {
    const [Empleados, setEmpleados] = useState([]);

    // Método se podría llamar "constructor", que nos ayuda a inicializar nuestas variables
    useEffect(() => {
        getEmpleados();
    }, []);


    //Usamos fetch para tener alternancia entre AXIOS Y FETCH
    const getEmpleados = async () => {
        try {
            const res = await fetch(
                "http://localhost:3306/"
            );
            // console.log(res);
            const datos = await res.json();
            setEmpleados(datos);
            console.log(datos);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='container d-flex'>
                <div className='row justify-content-around'>
                    {Empleados.map((item) => {
                        return (
                            <div className="card border border-success rounded p-2 col-5 mb-5" key={item.id_producto}>
                                <div className='row-fluid d-flex justify-content-between'>
                                    <div className='text-center  text-success border border-success rounded-pill col-2'>
                                        {item.tipo_producto}
                                    </div>
                                    <div className='text-center text-success col-2 fw-bold fs-5 font-monospace'>
                                        {item.precio}
                                    </div>
                                </div>
                                <br />
                                <img src={img} className="img-fluid col mb-1" alt="Img" />
                                <div className="row col">
                                    <h5 className="card-title">{item.nombre_producto}</h5>
                                    <p className="card-text">{item.descripcion}</p>
                                </div>
                                <hr />
                                <div className='row-fluid d-flex justify-content-between'>
                                    <div className='text-success'>
                                        Cantidad:
                                    </div>

                                    <div className='border border-success rounded-pill col-1 text-center fw-bold'>
                                        {item.cantidad}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
});

export default NuestrosEmpleados;