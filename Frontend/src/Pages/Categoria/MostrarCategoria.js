
import Axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import CrearCategoria from './CrearCategoria';
import EditarCategoria from './EditarCategoria';
import Navbar from '../Componets/sidebar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as FaIcons from "react-icons/md";
import SpinnerGrow from '../SpinnerGrow';


export default function MostrarCategoria() {

    const [category, setCategory] = useState();

    const [deleteShow, setDeletehow] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);
    const [datosE, estableceDatos] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const setDatosEditarCategoria = (item) => {
        estableceDatos(item);
    }

    const getCategory = () => {
        // nombre_categoria, tipo_categoria, prioridad_categoria
        Axios.post('https://celuantioqueno.onrender.com/categoria/nuestrasCategorias')
            .then((res) => {
                setCategory(res.data)
                setIsLoading(false);
            });
    }

    function deleteCategoria(id) {
        Axios.post('https://celuantioqueno.onrender.com/categoria/eliminarCategorias', {
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
        <>
            {isLoading === true ? <SpinnerGrow /> :
                <div className='d-flex'>
                    <Navbar />
                    <div className='container' style={{ margin: '8rem 0px 0px 0px' }}>
                        <h2 className='text-success text-center text-uppercase fs-1'>Lista de categorías </h2>
                        <hr />
                        <br />
                        <div className="d-flex">
                            <form className="d-flex me-1">
                                <input className="form-control me-2" type="search" placeholder="Buscar categoría..." aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Buscar</button>
                            </form>
                            <button type="button" className="col-2 btn btn-success" data-bs-toggle="modal" data-bs-target="#modal-category">
                                Crear categoría
                            </button>
                        </div>
                        <br />
                        <table className="container table table-hover">
                            <thead className='bg-success'>
                                <tr className='text-light text-center'>
                                    <th scope="col">Cód.</th>
                                    <th scope="col">Nombre Categoria</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-center text-capitalize">
                                {category.map((item) => {
                                    return (
                                        <tr key={item.id_categoria}>
                                            <td>{item.id_categoria}</td>
                                            <td className='text-start'>{item.nombre_categoria} </td>
                                            <td className='text-end'>
                                                <div className="d-flex">
                                                    <button id="btn-editCategoria" className="btn btn-warning me-1" data-bs-toggle="modal" data-bs-target="#modal-editCategoria" onClick={() => { setDatosEditarCategoria(item.id_categoria); }}>
                                                        <FaIcons.MdModeEdit />
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => { setModalData(item); setDeletehow(true); }} ><FaIcons.MdDelete className="" /></button>
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
            }
        </>
    )

}


