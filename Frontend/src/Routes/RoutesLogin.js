import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
// Home del cliente
// import CrearProducto from '../Pages/Productos/CrearProducto';
import NuestrosProductos from '../Pages/Productos/NuestrosProductos';

import CrearProveedor from '../Pages/Proveedor/CrearProveedor';
import NuestrosProveedores from '../Pages/Proveedor/NuestrosProveedores';

import CrearEmpleado from '../Pages/Empleados/CrearEmpleado';
import NuestrosEmpleados from '../Pages/Empleados/MostrarEmpleados';

import CrearCategoria  from '../Pages/Categoria/CrearCategoria';
import MostrarCategoria from '../Pages/Categoria/MostrarCategoria';
import MostrarCliente from '../Pages/Clientes/MostrarCliente';

//Home del empleado 

// // import HomeCliente from '../Pages/HomeCliente/HomeCliente';
// import MostrarInventario from '../Pages/Productos/Inventario';
import ClienteInicio from '../Pages/HomeCliente/ClienteInicio';
import EditarProducto from '../Pages/Productos/EditarProducto';
import CrearRol from '../Pages/Roles/CrearRol';
import NuestrosRoles from '../Pages/Roles/NuestrosRoles';
import NuestrosDocumentos from '../Pages/Documentos/nuestrosDocumentos';
import CrearDocumento from '../Pages/Documentos/crearDocumento';
import Compras from '../Pages/Productos/Compras';
import DetalleCompra from '../Pages/Productos/DetalleCompra';
//
import UploadImageFile from '../Pages/Productos/UploadImageFile';
import DetalleVenta from '../Pages/Productos/DetalleVenta';


function RoutesIndex() {
  return (
    <BrowserRouter>
      <Routes>


        {/* <Route exact path="/" element={<Login />} /> */}
        <Route exact path="/" element={<ClienteInicio />} />
        <Route exact path="/Registro" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Home" element={<Home />} />
        
        {/* <Route exact path="/CrearProducto" element={<CrearProducto />} /> */}
        <Route exact path='/EditarProducto/:id' element={<EditarProducto />}/>
        <Route exact path="/NuestrosProductos" element={<NuestrosProductos />} />
        <Route exact path="/Compras" element={<Compras />} />
        <Route exact path="/HistorialCompras" element={<DetalleCompra />} />
        {/* <Route exact path="/UploadFile/:id" element={<UploadImageFile />} /> */}
        <Route exact path="/HistorialVentas" element={<DetalleVenta />} />

        
        <Route exact path="/CrearProveedor" element={<CrearProveedor />} />
        <Route exact path="/NuestrosProveedores" element={<NuestrosProveedores />} />

        <Route exact path="/CrearEmpleado" element={<CrearEmpleado />} />
        <Route exact path="/NuestrosEmpleados" element={<NuestrosEmpleados />} />

        <Route exact path="/NuestrasCategorias" element={<MostrarCategoria/>} />
        <Route exact path="/CrearCategoria" element={<CrearCategoria/>} />

        <Route exact path="/NuestrosClientes" element={<MostrarCliente />} />
        
        <Route exact path="/CrearRol" element={<CrearRol />} />
        <Route exact path="/ActualizarRol" element={<CrearRol />} />
        <Route exact path="/NuestrosRoles" element={<NuestrosRoles />} />
        
        <Route exact path="/CrearDocumento" element={<CrearDocumento />} />
        <Route exact path="/NuestrosDocumentos" element={<NuestrosDocumentos />} />
      </Routes>

    </BrowserRouter>
  );
}

export default RoutesIndex;
