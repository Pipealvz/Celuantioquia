import Axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
// import { useForm } from "react-hook-form"
// import { Link } from 'react-router-dom';
import Navbar from '../../Pages/Componets/sidebar';
import * as FaIcons from "react-icons/md";
import CrearProducto from './CrearProducto';
//import SpinnerGrow from '../SpinnerGrow';
import SpinnerBorder from '../SpinnerGrow';
import Compras from './Compras';
import { Link } from 'react-router-dom';
//import UploadImageFile from './UploadImageFile';




const NuestrosProductos = () => {

    const [post, setPost] = React.useState(null);
    //const [modalData, setModalData] = React.useState(null);

    // const getModalData = (id) => {
    //     let newId = id
    //     return deleteProducto(newId);
    // }

    //const [deleteShow, setDeletehow] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //const { register, handleSubmit } = useForm();

    //const [category, setCategory] = useState([]);

    // const getCategory = () => {
    //     // nombre_categoria
    //     Axios.post('http://localhost:3306/categoria/nuestrasCategorias')
    //         .then((res) => {
    //             setCategory(res.data)
    //             console.log(res.data);
    //         });
    // }

    React.useEffect(() => {
        getAllProductos();
        //getCategory();
    }, []);

    const getAllProductos = () => {
        Axios.post('https://celuantioqueno.onrender.com/producto/nuestrosProductos')
            .then((response) => {
                setPost(response.data);
                setIsLoading(false);
            });
    }

    // const editProducto = values => {

    //     console.log(modalData);

    //     Axios.post('http://localhost:3306/producto/actualizarProducto', {
    //         id_producto: modalData.id_producto,
    //         nombre_producto: values.nombre_producto,
    //         tipo_producto: values.tipo_producto,
    //         cantidad: values.cantidad,
    //         precio: values.precio,
    //         descripcion: values.descripcion,
    //         producto_destacado: values.producto_destacado,
    //     })
    //         .then(function (res) {
    //             console.log(res);
    //             //             Alerta si se crea el producto correctamente
    //             Swal.fire({
    //                 title: "Proceso exitoso",
    //                 text: "Producto actualizado con exito",
    //                 icon: "success",
    //                 confirmButtonText: "Aceptar",
    //             }).then((res) => {
    //                 if (res.isConfirmed === true) {
    //                     window.location.reload(true);
    //                 }
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             //             Alerta si ocurre algun error al crea el producto 

    //             Swal.fire({
    //                 title: "Error",
    //                 text: "No se pudo actualizar el producto",
    //                 icon: "error",
    //                 confirmButtonText: "Aceptar",
    //             });
    //         });
    // }

    function deleteProducto(id) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro?',
            text: "Si se elimina el producto, no podrá ser recuperado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.post('https://celuantioqueno.onrender.com/producto/eliminarProducto', {
                    id_producto: id
                })
                    .then(() => {
                        swalWithBootstrapButtons.fire({
                            title: 'Eliminado!',
                            text: "El producto fue eliminado",
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            window.location.reload();
                        })
                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: 'Cancelado',
                    text: "No se eliminó ningún producto",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }
        })
    }

    return (
        <>
            {
                isLoading === true ?
                    <SpinnerBorder />
                    :
                    <div className='d-flex'>
                        <Navbar />
                        <div className='container' style={{ margin: '8rem 0px 0px 0px' }}>
                            <h2 className='text-success text-center text-uppercase fs-1'>Lista de productos</h2>
                            <hr />
                            <br />
                            <div className="d-flex">
                                <form className="d-flex me-1">
                                    <input className="form-control me-2" type="search" placeholder="Buscar producto..." aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                                </form>
                                <button type="button" className="col-2 btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Crear Producto
                                </button>
                                <Link to={"/HistorialCompras"} className="col-2 btn btn-success ms-auto">
                                    Historial de compras
                                </Link>
                                <Link to={"/HistorialVentas"} className="col-2 btn btn-success ms-auto">
                                    Historial de ventas
                                </Link>
                            </div>
                            <br />
                            <table className='container table table-hover'>
                                <thead className='bg-success'>
                                <tr className='text-light text-center'>
                                    <th className='text-center' scope="col">Cód.</th>
                                    <th className='text-start col-2' scope="col">Nombre Producto</th>
                                    <th scope="col">Cantidad</th>
                                    <th className='text-start col-3' scope="col">Descripción</th>
                                    <th className='text-end' scope="col">Precio</th>
                                    <th className='text-center' scope="col">Destacado</th>
                                    <th className='text-center' scope="col">Categoría</th>
                                    <th className='text-center' scope="col">Acciones</th>
                                </tr>
                            </thead>
                                <tbody className='text-center text-capitalize'>
                                    {post.map((item) => {

                                        return (
                                            <>
                                                <tr key={item.id_producto}>
                                                    <td className='text-start' id='tdName'>
                                                        <button type="button" className="btn ms-auto" data-bs-toggle="modal" data-bs-target="#modalPurchase2" onClick={() => { alert("En construcción.") }}>
                                                            {item.id_producto}
                                                        </button>
                                                    </td>
                                                    <td className='text-start' id='tdName'>{item.nombre_producto}</td>
                                                    <td id='tdStock'>{item.cantidad}</td>
                                                    <td className='text-break text-start' id='tdDescription'>{item.descripcion}</td>
                                                    <td className='text-start' id='tdPrice'>{Math.trunc(item.precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                                    <td id='tdFavorite'>{item.producto_destacado === 1 ? 'Sí' : 'No'}</td>
                                                    <td className='text-start' id='tdCategory'>{item.nombre_categoria}</td>
                                                    <td id='tdActions'>
                                                        <div className='d-flex'>
                                                            <button className="btn btn-danger me-1" onClick={() => { deleteProducto(item.id_producto); }} ><FaIcons.MdDelete /> </button>
                                                            <Link className="btn btn-warning me-1" to={`/EditarProducto/${item.id_producto}`}> <FaIcons.MdModeEdit /></Link>
                                                            {/* <Link className="btn btn-success" to={`/UploadFile/${item.id_producto}`}> <FaIcons.MdUploadFile /></Link> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                                {/* <div className='row'> Total de productos: {post.length} </div> */}

                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <CrearProducto />
                                </div>

                                <div className="modal fade" id="modalPurchase" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <Compras />
                                </div>
                                {/* <div className="modal fade" id="modalFile" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <UploadImageFile />
                                </div> */}
                            </table>
                        </div>
                    </div>
            }
        </>
    );
};

export default NuestrosProductos;