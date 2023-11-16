"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");


//Crear proveedor
router.post('/crearRol', async (req, res) => {
    const { nombre_rol, estado_rol } = req.body;

    if (!nombre_rol || !estado_rol) return res.status(400).json({ status: "error", error: "Por favor envia datos" });

    else {
        db.query("SELECT nombre_rol FROM rol WHERE nombre_rol = ?", [nombre_rol], async (err, result) => {
            if (err) return err;
            if (result[0]) return res.status(400).json({ status: "error", error: "Ya se ha registrado un rol con este nombre" })

            else {
                db.query("INSERT INTO rol SET ?", {
                    nombre_rol: nombre_rol,
                    estado_rol: estado_rol
                }, (error, result) => {
                    if (error) return error;
                    return res.json({ status: "success", success: "El proveedor se ha registrado" });
                });
            }
        });
    }
});


//Mostar Proveedores
router.post('/nuestrosRol', async (req, res) => {
    db.query('SELECT * FROM rol;', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }

    });
});


//Eliminar Proveedores
router.post('/eliminarRol', async (req, res) => {

    const { id_rol } = req.body;
    db.query('SELECT id_rol FROM rol WHERE id_rol = ?', [id_rol], async (err, result) => {
        if (err) return err;
        if (!result[0]) return res.status(400).json({ status: "error", error: "No existe un rol con este Id" })
        else {
            db.query('DELETE FROM rol WHERE id_rol = ? ', [id_rol], async (err, result) => {
                if (!err) {
                    res.json({ status: "success", error: "Se eliminó correctamente el rol" });
                } else {
                    res.status(400).json({ status: "error", error: "Error al eliminar" });
                }
            });
        }
    });
});

//Actualizar proveedor
router.post('/actualizarRol', async (req, res) => {
    const { id_rol, nombre_rol, estado_rol } = req.body;

    db.query('UPDATE rol SET nombre_rol = ?, estado_rol = ?  WHERE id_rol = ?',
        [nombre_rol, estado_rol, id_rol],
        async (err, result) => {
            if (!err) {
                res.json({ status: "success", error: "Se actualizó correctamente el rol" });
            } else {
                res.status(400).json({ status: "error", error: "Error al actualizar" });
            }
        });
});

//Mostar proveedor por id
router.post('/rolId', async (req, res) => {

    const { id_rol } = req.body;

    db.query('SELECT * FROM rol  WHERE id_rol = ?', [id_rol], async (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

module.exports = router;