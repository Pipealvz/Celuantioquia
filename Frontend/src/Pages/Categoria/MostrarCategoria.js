
import { useEffect, useState } from 'react';
import Navbar from '../Pages/Componets/Navbar';
import CrearCategoria from './CrearCategoria';

const MostrarCategoria = () => {

    const { Categoria, setCategoria } = useState();

    const getCategory = async () => {
        try {
            const res = await fetch(
                "http://localhost:3306/"
            );
            // console.log(res);
            const datos = await res.json();
            setCategoria(datos);
            console.log(datos);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getCategory();
    });

    return (<>
        <Navbar />
        <div className='container p-4 vh-auto border rounded shadow'>
            <h2 className='text-success text-center text-uppercase fs-1'>Lista de Categorías</h2>
            <hr />
            {
                Categoria.map(item => {
                    return (
                        <div className="card" key={item.id_categoria}>
                            <div className="row d-flex card-body">
                                <div id="nombre_categoria" className="fw-bold col-7 fs-5"> {item.nombre_categoria} </div>
                                <div className="row col-4 d-flex justify-content-between">
                                    <button className="btn btn-warning col-5">Editar</button>
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
                        id="btn-crearcategory"
                        className="btn btn-success col-lg-4 col-12"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-empleado"
                    >
                        Agregar categoría
                    </div>
                </div>
            </div>
            <CrearCategoria />
        </div>
    </>
    )

}

export default MostrarCategoria;