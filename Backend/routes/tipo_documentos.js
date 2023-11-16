"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");


//Crear proveedor
router.post('/crearDocumento', async (req, res) => {
    const { nombre_documento, estado_documento } = req.body;

    if (!nombre_documento || !estado_documento) return res.status(400).json({ status: "error", error: "Por favor envia datos" });

    else {
        db.query("SELECT nombre_documento FROM tipo_documento WHERE nombre_documento = ?", [nombre_documento], async (err, result) => {
            if (err) return err;
            if (result[0]) return res.status(400).json({ status: "error", error: "Ya se ha registrado un documento con este nombre" })

            else {
                db.query("INSERT INTO tipo_documento SET ?", {
                    nombre_documento: nombre_documento,
                    estado_documento: estado_documento
                }, (error, result) => {
                    if (error) return error;
                    return res.json({ status: "success", success: "El documento se ha registrado" });
                });
            }
        });
    }
});


//Mostar Proveedores
router.post('/nuestrosDocumentos', async (req, res) => {
    db.query('SELECT * FROM tipo_documento;', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }

    });
});


//Eliminar Proveedores
router.post('/eliminarDocumento', async (req, res) => {

    const { id_documento } = req.body;
    db.query('SELECT id_documento FROM tipo_documento WHERE id_documento = ?', [id_documento], async (err, result) => {
        if (err) return err;
        if (!result[0]) return res.status(400).json({ status: "error", error: "No existe un documento con este Id" })
        else {
            db.query('DELETE FROM tipo_documento WHERE id_documento = ? ', [id_documento], async (err, result) => {
                if (!err) {
                    res.json({ status: "success", error: "Se eliminó correctamente el documento" });
                } else {
                    res.status(400).json({ status: "error", error: "Error al eliminar" });
                }
            });
        }
    });
});

//Actualizar proveedor
router.post('/actualizarDocumento', async (req, res) => {
    const { id_documento, nombre_documento, estado_documento } = req.body;

    db.query('UPDATE tipo_documento SET nombre_documento = ?, estado_documento = ?  WHERE id_documento = ?',
        [nombre_documento, estado_documento, id_documento],
        async (err, result) => {
            if (!err) {
                res.json({ status: "success", error: "Se actualizó correctamente el tipo de documento" });
            } else {
                res.status(400).json({ status: "error", error: "Error al actualizar" });
            }
        });
});

//Mostar proveedor por id
router.post('/documentoId', async (req, res) => {

    const { id_documento } = req.body;

    db.query('SELECT * FROM tipo_documento  WHERE id_documento = ?', [id_documento], async (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

module.exports = router;