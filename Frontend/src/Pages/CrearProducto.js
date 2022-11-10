import Axios from 'axios';
import React, { memo } from 'react';
import Swal from 'sweetalert2';

import Navbar from '../Pages/Componets/Navbar';

const CrearProducto = memo(() => {

    const isCorrect = () => {
        Swal.fire({
            title: "Correcto",
            text: "Producto creado exitosamente",
            icon: "success",
            confirmButtonText: "Aceptar",
        });
    }
    const isIncorrect = () => {
        Swal.fire({
            title: "Error",
            text: "El producto no fue agregad correctamente",
            icon: "error",
            confirmButtonText: "Aceptar",
        });
    }
    
    function createProduct(e) {
        //e.preventDefault();
        const producto = {
            nombre_producto: document.getElementById("nombre_producto").value,
            tipo_producto: document.getElementById("tipo_producto").value,
            cantidad: document.getElementById("cantidad").value,
            precio: document.getElementById("precio").value,
            descripcion: document.getElementById("descripcion").value,
            producto_destacado: document.getElementById("producto_destacado").value

        }

        Axios
            .post('https://api-celu.felipealvarez8.repl.co/api/products/new', producto)
            .then(function ({ data, status }) {
                console.log(data);
                if (status === 200) {
                    return isCorrect();
                    
                } else {
                    return isIncorrect();
                }
            })
            .catch(function (error) {
                console.log(error);
                return isIncorrect();
            });
    }
    return (<>
        <Navbar />
        <div className='container vh-100'>
            <h2 className='text-success text-center text-uppercase fs-1'>Crear producto</h2>
            <hr />
            <form>
                <div className="row text-success d-flex mb-3">
                    <label for="nombre_producto" className="form-label">Nombre del producto</label>
                    <input type="text" className="form-control" id="nombre_producto" aria-describedby="emailHelp" />
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="tipo_producto" className="form-label">Tipo del produto</label>
                    <input type="text" className="form-control" id="tipo_producto" />
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="cantidad" className="form-label">Cantidad del producto</label>
                    <input type="number" min="1" className="form-control" id="cantidad" />
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="precio" className="form-label">Precio del producto</label>
                    <input type="number" min="1" className="form-control" id="precio" />
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="descripcion" className="form-label">Descripción</label>
                    <textarea type="text" className="form-control text-area" id="descripcion"></textarea>
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="producto_destacado" className="form-label">Destacar producto</label>
                    <input type="number" min="0" max="1" className="form-control" id="producto_destacado" />
                </div>
                <br />
                <div className='d-flex justify-content-center'>
                    <buttom type="submit" className="btn btn-success col-4" value="Crear" onClick={createProduct}></buttom>
                </div>
                <br />
            </form>
        </div>
    </>);
});

export default CrearProducto;