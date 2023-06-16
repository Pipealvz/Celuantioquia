"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");


//Crear proveedor
router.post('/crearProveedor', async (req, res) => {
    const { nombre_proveedor, correo_proveedor , contacto_proveedor, nit_proveedor, direccion_proveedor } = req.body;

    if (!nombre_proveedor || !correo_proveedor || !contacto_proveedor || !nit_proveedor || !direccion_proveedor ) return res.status(400).json({ status: "error", error: "Por favor envia datos" });

    else {
        db.query("SELECT nombre_proveedor FROM proveedor WHERE nombre_proveedor = ?", [nombre_proveedor], async (err, result) => {
            if (err) return err;
            if (result[0]) return   res.status(400).json({ status: "error", error: "Ya se ha registrado un proveedor con este nombre" })

            else {
                db.query("INSERT INTO proveedor SET ?", {
                    nombre_proveedor: nombre_proveedor, 
                    correo_proveedor:correo_proveedor , 
                    contacto_proveedor: contacto_proveedor, 
                    nit_proveedor: nit_proveedor, 
                    direccion_proveedor: direccion_proveedor                    
                }, (error, result) => {
                    if (error) return error;
                    return res.json({ status: "success", success: "El proveedor se ha registrado" });
                });
            }
        });
    }
});


//Mostar Proveedores
router.post('/nuestrosProveedores', async (req, res) => {
    db.query('SELECT * FROM proveedor;', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            res.status(400).json({status: "error", error: "Error al consultar datos" });
        }

    });
});


//Eliminar Proveedores
router.post('/eliminarProveedores', async (req, res) => {

    const { id_proveedor } = req.body;
    db.query('SELECT id_proveedor FROM proveedor WHERE id_proveedor = ?', [id_proveedor], async (err, result) => {
        if (err) return err;
        if (!result[0]) return   res.status(400).json({ status: "error", error: "No existe un proveedor con este Id" })
        else {
            db.query('DELETE FROM proveedor WHERE id_proveedor = ? ', [id_proveedor], async (err, result) => {
                if (!err) {
                    res.json({ status: "success", error: "Se Elimino Correctamente el proveedor" });
                } else {
                    res.status(400).json({ status: "error", error: "Error al eliminar" });
                }
            });
        }
    });
});

//Actualizar proveedor
router.post('/actualizarProveedor', async (req, res)=>{
    const {id_proveedor, nombre_proveedor, correo_proveedor , contacto_proveedor, nit_proveedor, direccion_proveedor
    } = req.body;

        db.query('UPDATE proveedor SET nombre_proveedor = ?, correo_proveedor = ?, contacto_proveedor = ?, nit_proveedor = ?, direccion_proveedor = ?  WHERE id_proveedor = ?',
        [nombre_proveedor, correo_proveedor, contacto_proveedor, nit_proveedor, direccion_proveedor, id_proveedor],
        async (err, result)=> {
            if (!err) {
                res.json({ status: "success", error: "Se Actualizo Correctamente el proveedor" });
            } else {
                res.status(400).json({ status: "error", error: "Error al actualizar" });
            }
        });
});

//Mostar proveedor por id
router.post('/proveedorPorId', async (req, res) => {

    const { id_proveedor } = req.body;
    
    db.query('SELECT * FROM proveedor  WHERE id_proveedor = ?',[id_proveedor] , async (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

module.exports = router;