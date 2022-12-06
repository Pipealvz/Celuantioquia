import React from "react";
import Navbar from "./Componets/Navbar";

const CrearProveedor = () => {
    return (<>
        <Navbar />
        <div className='container p-4 vh-100 border rounded shadow'>
            <h2 className='text-success text-center text-uppercase fs-1'>Registrar Proveedor</h2>
            <hr />
            <form className="">
                <div className="row text-success d-flex mb-3">
                    <label for="nombre_proveedor" className="form-label">Nombre del proveedor</label>
                    <input type="text" className="form-control" id="nombre_proveedor" aria-describedby="emailHelp" />
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="correo_proveedor" className="form-label">Correo del proveedor</label>
                    <input type="email" className="form-control" id="correo_proveedor" />
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="contacto_proveedor" className="form-label">Contacto del proveedor</label>
                    <div className="input-group">
                        <span className="input-group-text bg-success text-light">📱 604</span>
                        <input type="number" min="1" className="form-control" id="contacto_proveedor" placeholder="Número de teléfono" />
                    </div>
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="nit_proveedor" className="form-label">NIT del proveedor</label>
                    <input type="number" min="1" className="form-control" id="nit_proveedor" placeholder="Último dígito el indicativo del NIT" />
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="direccion_proveedor" className="form-label">Dirección del proveedor</label>
                    <input type="text" min="1" className="form-control" id="direccion_proveedor"/>
                </div>
                <br />
                <div className='d-flex justify-content-center'>
                    <buttom type="submit" className="btn btn-success col-4" value="Crear">Registrar Proveedor</buttom>
                </div>
            </form>
        </div>
    </>
    )

}

export default CrearProveedor;