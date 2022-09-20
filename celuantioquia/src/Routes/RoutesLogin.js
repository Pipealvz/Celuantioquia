import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../Pages/Login"

function RoutesIndex() {
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Login/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default RoutesIndex;
