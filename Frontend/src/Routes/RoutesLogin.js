import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";

import CrearProducto from '../Pages/Productos/CrearProducto';
import NuestrosProductos from '../Pages/Productos/NuestrosProductos';

import CrearCategoria from '../Pages/CrearCategoria';

import CrearProveedor from '../Pages/Proveedor/CrearProveedor';
import NuestrosProveedores from '../Pages/Proveedor/NuestrosProveedores';

import CrearEmpleado from '../Pages/Empleados/CrearEmpleado';
import NuestrosEmpleados from '../Pages/Empleados/NuestrosEmpleados';



function RoutesIndex() {
  return (
    <BrowserRouter>
      <Routes>
        

        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/Registro" element={<Register/>}/>
        <Route exact path="/Home" element={<Home/>}/>
        <Route exact path="/CrearProducto" element={<CrearProducto/>}/>
        <Route exact path="/NuestrosProductos" element={<NuestrosProductos/>}/>
        <Route exact path="/CrearCategoria" element={<CrearCategoria/>}/>
        <Route exact path="/CrearProveedor" element={<CrearProveedor/>}/>
        <Route exact path="/NuestrosProveedores" element={<NuestrosProveedores/>}/>

        <Route exact path="/CrearEmpleado" element={<CrearEmpleado/>}/>
        <Route exact path="/NuestrosEmpleados" element={<NuestrosEmpleados/>}/>


      </Routes>
      
    </BrowserRouter>
  );
}

export default RoutesIndex;
