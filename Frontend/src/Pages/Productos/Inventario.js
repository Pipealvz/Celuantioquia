import React from 'react';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../Componets/sidebar';
// import * as FaIcons from "react-icons/md";


const MostrarInventario = () => {


    const [inventario, setInventario] = useState();
    // const [modalData, setModalData] = useState(null);

    // const setDatosEditarEmpleados = (item) => {
    //     estableceDatos(item);
    // }

    const getInventory = () => {
        Axios.post('http://localhost:3306/producto/inventario')
            .then((response) => {
                setInventario(response.data);
                console.log(response.data);
            });
    }

    // function deleteCliente(id) {
    //     Axios.post('https://celuantioqueno.onrender.com/cliente/eliminarCliente', {
    //         id_inventario: id
    //     })
    //         .then(() => {
    //             window.location.reload(true);
    //         });
    // }

    useEffect(() => {
        getInventory();
    }, []);

    // const eliminar = (id) => {

    //     Swal.fire({
    //         title: '¡Espera!',
    //         text: "¿Estás seguro de eliminar este cliente?",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: 'green',
    //         cancelButtonColor: 'red',
    //         confirmButtonText: 'Sí, eliminar',
    //         cancelButtonText: 'Cancelar'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             deleteCliente();
    //             Swal.fire(
    //                 'Eliminado!',
    //                 'Este cliente fue eliminado.',
    //                 'success'
    //             )
    //             deleteCliente(id);
    //         }
    //     })
    // }

    if (!inventario) return null;

    return (
        <div className='d-flex'>
            <Navbar />

            <div className='container p-4 vh-auto border rounded shadow' style={{ margin: '5rem 4rem 5rem 4rem' }}>

                <h2 className='text-success text-center text-uppercase fs-1' >Inventario</h2>

                {/* <div className="container">
                    <div className="row-fluid mt-4 justify-content-center d-flex">
                        <div
                            id="btn-crelote"
                            className="btn btn-success col-lg-4 col-12"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-cliente"
                            style={{ marginBottom: '1rem' }}
                        >
                            Agregar cliente
                        </div>
                    </div>
                </div> */}

                <table className="table text-success">
                    <thead>
                        <tr>
                            <th scope="col">Nombre producto</th>
                            <th scope="col">Nombre categoría</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Proveedor</th>
                            <th scope="col">Correo proveedor</th>
                            <th scope="col">Correo proveedor</th>
                            <th scope="col">NIT proveedor</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider ">

                        {inventario.map((item) => {
                            return (

                                <tr className="table-light text-success ">
                                    <td key={item.nombre_producto}></td>
                                    <td>{item.nombre_categoria} </td>
                                    <td>{item.precio}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.cantidad_producto}</td>
                                    <td>{item.nombre_proveedor}</td>
                                    <td>{item.correo_proveedor}</td>
                                    <td>{item.nit_proveedor}</td>
                                    <td>{item.contacto_proveedor}</td>
                                    {/* <td>
                                        <button className='btn btn-success bg-' data-bs-toggle="modal" data-bs-target="#deleteCustomer" onClick={() => { setModalData(item) }}>
                                            <span><FaIcons.MdDelete></FaIcons.MdDelete></span>
                                        </button>
                                    </td> */}
                                </tr>
                            )
                        })}
                        {/* <div class="modal fade" id="deleteCustomer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Advertencia</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        ¿Estás seguro de eliminar este cliente?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-success" onClick={() => { deleteCliente(modalData.id_cliente) }}>Sí, eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </tbody>
                </table>
            </div>
        </div>
    )

}


export default MostrarInventario;