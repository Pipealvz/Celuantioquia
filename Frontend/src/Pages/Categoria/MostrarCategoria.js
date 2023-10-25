
import Axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import CrearCategoria from './CrearCategoria';
import EditarCategoria from './EditarCategoria';
import Navbar from '../Componets/sidebar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as FaIcons from "react-icons/md";


export default function MostrarCategoria() {

    const [category, setCategory] = useState();

    const [deleteShow, setDeletehow] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);
    const [datosE, estableceDatos] = useState(null);


    const setDatosEditarCategoria = (item) => {
        estableceDatos(item);
    }

    const getCategory = () => {
        // nombre_categoria, tipo_categoria, prioridad_categoria
        Axios.post('http://localhost:3306/categoria/nuestrasCategorias')
            .then((res) => {
                setCategory(res.data)
                console.log(res.data);

            });
    }

    function deleteCategoria(id) {
        Axios.post('http://localhost:3306/categoria/eliminarCategorias', {
            id_categoria: id
        })
            .then(() => {
                window.location.reload(true);
            });

        }
        useEffect(() => {
            getCategory();
        }, []);


        if (!category) return null;

        return (
            <div className='d-flex'>
                <Navbar />

                <div className='container p-4 vh-auto border rounded shadow' style={{ margin: '5rem 4rem 5rem 4rem' }}>

                    <h2 className='text-success text-center text-uppercase fs-1'>Lista de categorías </h2>

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

                    <table className="table text-success">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre Categoria</th>
                                <th scope="col">Acciones</th>

                            </tr>
                        </thead>
                        <tbody className="table-group-divider ">
                            {category.map((item) => {
                                return (
                                    <tr className="table-light text-success ">
                                        <th scope="row" key={item.id_Categoria}></th>
                                        <td>{item.nombre_categoria} </td>                                  
                                        <td>
                                            <div className="row d-flex">
                                                <div
                                                    id="btn-editCategoria"
                                                    className="btn btn-outline-success  col-5"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modal-editCategoria"
                                                    style={{width: 'auto', marginTop: '1rem', height:' 2.5rem'}}
                                                    onClick={() => { setDatosEditarCategoria(item.id_categoria); }}
                                                >
                                                    <FaIcons.MdModeEdit className="" />
                                                </div>

                                                <Button variant="outline-success" style={{ margin: '1rem', width: 'auto' }} onClick={() => { setModalData(item); setDeletehow(true); }} ><FaIcons.MdDelete className="" /></Button>
                                            </div>
                                        </td>

                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                    <EditarCategoria setDatosEditarCategoria={datosE} />
                    <Modal
                        show={deleteShow}
                        onHide={() => setDeletehow(false)}
                        aria-labelledby="contained-modal-title-vcenter"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Advertencia
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>¿Estas seguro de queres eliminar este producto?</Modal.Body>

                        <Modal.Footer>
                            <Button variant="success" onClick={() => setDeletehow(false)}>
                                No
                            </Button>
                            <Button variant="success" onClick={() => { deleteCategoria(modalData.id_categoria) }}>
                                si
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <CrearCategoria />
                </div>
            </div>
        )

    }


