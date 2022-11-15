"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");


//Crear Proveedor
router.post('/crearProveedor', async (req, res) => {
    const { nombre_proveedor, correo_proveedor , contacto_proveedor, nit, direccion_proveedor } = req.body;

    if (!nombre_proveedor || !correo_proveedor || !contacto_proveedor || !nit || !direccion_proveedor ) return res.json({ status: "error", error: "Por favor envia datos" });

    else {
        db.query("SELECT nombre_proveedor FROM Proveedor WHERE nombre_proveedor = ?", [nombre_proveedor], async (err, result) => {
            if (err) throw err;
            if (result[0]) return res.json({ status: "error", error: "Ya se ha registrado un proveedor con este nombre" })

            else {
                db.query("INSERT INTO Empleado SET ?", {
                    nombre_proveedor: nombre_proveedor, 
                    correo_proveedor:correo_proveedor , 
                    contacto_proveedor: contacto_proveedor, 
                    nit: nit, 
                    direccion_proveedor: direccion_proveedor                    
                }, (error, result) => {
                    if (error) throw error;
                    return res.json({ status: "success", success: "La Categoria se ha registrado" });
                });
            }
        });
    }
});


//Mostar Proveedores
router.post('/nuestrosProveedores', async (req, res) => {
    db.query('SELECT * FROM Proveedor;', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            res.json({status: "error", error: "Error al consultar datos" });
        }

    });
});


//Eliminar Proveedores
router.post('/eliminarProveedores', async (req, res) => {

    const { id_proveedor } = req.body;
    db.query('SELECT id_proveedor FROM Proveedor WHERE id_proveedor = ?', [id_proveedor], async (err, result) => {
        if (err) throw err;
        if (!result[0]) return res.json({ status: "error", error: "No existe un proveedor con este Id" })
        else {
            db.query('DELETE FROM Proveedor WHERE id_proveedor = ? ', [id_proveedor], async (err, result) => {
                if (!err) {
                    res.json({ status: "success", error: "Se Elimino Correctamente el proveedor" });
                } else {
                    res.json({ status: "error", error: "Error al eliminar" });
                }
            });
        }
    });
});

//Actualizar Proveedor
router.post('/actualizarProveedor', async (req, res)=>{
    const {id_proveedor, nombre_proveedor, correo_proveedor , contacto_proveedor, nit, direccion_proveedor
    } = req.body;

        db.query('UPDATE Proveedor SET nombre_proveedor = ?, correo_proveedor = ?, contacto_proveedor = ?, nit = ?, direccion_proveedor = ?  WHERE id_proveedor = ?',
        [nombre_proveedor, correo_proveedor, contacto_proveedor, nit, direccion_proveedor, id_proveedor],
        async (err, result)=> {
            if (!err) {
                res.json({ status: "success", error: "Se Actualizo Correctamente el Proveedor" });
            } else {
                res.json({ status: "error", error: "Error al actualizar" });
            }
        });
});

//Mostar proveedor por id
router.post('/proveedorPorId', async (req, res) => {

    const { id_proveedor } = req.body;
    
    db.query('SELECT * FROM Proveedor  WHERE id_proveedor = ?',[id_proveedor] , async (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

module.exports = router;