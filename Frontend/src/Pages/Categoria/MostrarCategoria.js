
import Axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import CrearCategoria from './CrearCategoria';
import EditarCategory from './EditarCategory';

const MostrarCategory = () => {

    const [category, setCategory] = useState();

    const getCategory = () => {
        // nombre_categoria, tipo_categoria, prioridad_categoria
        Axios.post('https://celuantioqueno.onrender.com/categoria/nuestrasCategorias')
            .then((res) => {
                setCategory(res.data)
                console.log(res.data);

            });
    }

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <div className='container p-4 vh-auto border rounded shadow'>
            <h2 className='text-success text-center text-uppercase fs-1'>Lista de categorías </h2>
            {/* {category.map((item) => {
                return (
                    <div className="card" key={item.id_empleado}>
                        <div className="row d-flex card-body">
                            <div id="nombre_empleado" className="fw-bold col-7 fs-5"> {item.nombre_categoria} </div>
                            <div id="nombre_empleado" className="fw-bold col-7 fs-5"> {item.tipo_categoria} </div>
                            <div className="row col-4 d-flex justify-content-between">
                                <div
                                    id="btn-editEmpleado"
                                    className="btn btn-warning col-5"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal-editar-category"
                                >
                                    Editar categoría
                                </div>
                                <EditarCategory />
                                <button className="btn btn-danger col-5">Eliminar</button>
                            </div>
                        </div>
                    </div>
                )
            })
            } */}
            <div className="container">
                <div className="row-fluid mt-4 justify-content-center d-flex">
                    <div
                        id="btn-category"
                        className="btn btn-success col-lg-4 col-12"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-category"
                    >
                        Crear categoría
                    </div>
                </div>
            </div>
            <CrearCategoria />
        </div>
    )

}

export default MostrarCategory;