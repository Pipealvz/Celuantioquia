import Axios from 'axios';
//import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
//import * as FaIcons from "react-icons/md";
import SpinnerGrow from '../SpinnerGrow';
import Navbar from '../../Pages/Componets/sidebar';
import Compras from './Compras';

const DetalleCompra = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState([]);

    const getPurchases = () => {
        Axios.post('https://celuantioqueno.onrender.com/producto/mostrarCompras')
            .then((response) => {
                setPost(response.data);
                console.log(response.data);
                setIsLoading(false);
            });
    }
    const handleSubmitFilter = (e) => {
        e.preventDefault();
    }
    const filterPurchase = (id) => {
        console.log(id);
        Axios.post(`http://localhost:3306/producto/comprasPorId/${id}`, { id: id })
            .then((response) => {
                setPost(response.data);
                console.log(response.data);
            });
    }

    useEffect(() => { getPurchases(); }, [])

    return (
        <>
            {isLoading === true ?
                <SpinnerGrow /> :
                <div className='d-flex'>
                    <Navbar />
                    <div className='container' style={{ margin: '8rem 0px 0px 0px' }}>
                        <h2 className='text-success text-center text-uppercase fs-1'>Historial de compras</h2>
                        <hr />
                        {/* <form onSubmit={handleSubmitFilter}>
                            <select className="col-3" id="">
                                {!post ? 'No hay movimientos disponibles' :
                                    post.map((item) => {
                                        return (
                                            <>
                                                <option onClick={() => { filterPurchase(item.id_producto) }} className='form-label text-start text-capitalize' key={item.id_movimiento} value={item.id_producto}>{item.id_producto} - {item.nombre_producto}</option>

                                            </>
                                        )
                                    })}
                            </select>
                            <button type="submit" className='btn btn-success'>Buscar</button>
                        </form> */}
                        <button type="button" className="col-2 btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Agregar Compra
                        </button>
                        <table className='container table table-hover'>
                            <thead className='bg-success'>
                                <tr className='text-light text-center'>
                                    <th className='text-center' scope="col">#</th>
                                    <th className='text-start col-4' scope="col">Nombre Producto</th>
                                    <th className='text-start col-3' scope="col">Nombre Proveedor</th>
                                    <th className='text-center' scope="col">Cantidad</th>
                                    <th className='text-end' scope="col">Precio</th>
                                    <th className='text-center' scope="col">Fecha de compra</th>
                                </tr>
                            </thead>
                            {!post ? 'No hay movimientos disponibles' :
                                post.map((item) => {
                                    return (
                                        <>
                                            <tbody className='text-center text-capitalize' key={item.id_movimiento}>
                                                <tr>
                                                    <td className='text-center' id='tdName'>{item.id_producto}</td>
                                                    <td className='text-start' id='tdName'>{item.nombre_producto}</td>
                                                    <td className='text-start' id='tdName'>{item.nombre_proveedor}</td>
                                                    <td className='text-center' id='tdName'>{item.cantidad_compra}</td>
                                                    <td className='text-end' id='tdName'>{Math.trunc(item.precio_compra).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                                    <td className='text-end' id='tdName'>{item.fecha_compra}</td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                })}
                        </table>
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <Compras />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DetalleCompra;