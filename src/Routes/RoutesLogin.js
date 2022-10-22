import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import CrearProducto from '../Pages/CrearProducto';
import NuestrosProductos from '../Pages/NuestrosProductos';


function RoutesIndex() {
  return (
    <BrowserRouter>
      <Routes>
        

        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/Registro" element={<Register/>}/>
        <Route exact path="/Home" element={<Home/>}/>
        <Route exact path="/CrearProducto" element={<CrearProducto/>}/>
        <Route exact path="/NuestrosProductos" element={<NuestrosProductos/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default RoutesIndex;
