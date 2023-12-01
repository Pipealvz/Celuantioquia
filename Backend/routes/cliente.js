"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");


//Crear Categoria
router.post('/crearCliente', async (req, res) => {
    const { nombre_cliente, documento_cliente, tipo_documento_cliente, direccion_vivienda, telefono_contacto, correo_cliente,
        contraseña_cliente, rol_cliente } = req.body;

    if (!nombre_cliente || !documento_cliente || !tipo_documento_cliente || !direccion_vivienda || !telefono_contacto || !correo_cliente ||
        !contraseña_cliente || !rol_cliente) return res.status(400).json({ status: "error", error: "Por favor envía datos" });

    else {
        db.query("SELECT documento_cliente FROM cliente WHERE documento_cliente = ?", [documento_cliente], async (err, result) => {
            if (err) return err;
            if (result[0]) return res.status(400).json({ status: "error", error: "Ya se ha registrado un cliente con este nímero de identificación" })

            else {
                db.query("INSERT INTO cliente SET ?", {
                    nombre_cliente: nombre_cliente,
                    documento_cliente: documento_cliente,
                    tipo_documento_cliente: tipo_documento_cliente,
                    direccion_vivienda: direccion_vivienda,
                    telefono_contacto: telefono_contacto,
                    correo_cliente: correo_cliente,
                    contraseña_cliente: contraseña_cliente,
                    rol_cliente: rol_cliente
                }, (error, result) => {
                    if (error) return error;
                    return res.json({ status: "success", success: "El cliente se ha registrado correctamente" });
                });
            }
        });
    }
});


//Mostar Categorias
router.post('/nuestrosClientes', async (req, res) => {
    db.query('SELECT cli.*, tdp.nombre_documento FROM cliente cli INNER JOIN tipo_documento tdp ON cli.tipo_documento_cliente = tdp.id_documento;', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }

    });
});

//Mostar Categorias por id
router.post('/clientePorId', async (req, res) => {

    const { id_cliente } = req.body;

    db.query('SELECT * FROM cliente  WHERE id_cliente = ?', [id_cliente], async (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

//Eliminar Categorias
router.post('/eliminarCliente', async (req, res) => {

    const { id_cliente } = req.body;
    db.query('SELECT id_cliente FROM cliente WHERE id_cliente = ?', [id_cliente], async (err, result) => {
        if (err) return err;
        if (!result[0]) return   res.status(400).json({ status: "error", error: "No existe un cliente con este Id" })
        else {
            db.query('DELETE FROM cliente WHERE id_cliente = ? ', [id_cliente], async (err, result) => {
                if (!err) {
                    res.json({ status: "success", error: "Se Elimino Correctamente el cliente" });
                } else {
                    res.status(400).json({ status: "error", error: "Error al eliminar" });
                }
            });
        }
    });
});


//Actualizar Categorias
router.post('/actualizarCliente', async (req, res) => {
    const { id_cliente, nombre_cliente, documento_cliente, tipo_documento_cliente, direccion_vivienda, telefono_contacto, correo_cliente,
        contraseña_cliente } = req.body;

    db.query('UPDATE cliente SET  nombre_cliente = ?, documento_cliente = ?, tipo_documento_cliente = ?, direccion_vivienda = ?, telefono_contacto = ?, correo_cliente = ?, contraseña_cliente = ? WHERE id_cliente = ?',
        [nombre_cliente, documento_cliente, tipo_documento_cliente, direccion_vivienda, telefono_contacto, correo_cliente,
            contraseña_cliente, id_cliente],
        async (err, result) => {
            if (!err) {
                res.json({ status: "success", error: "Se actualizó correctamente el cliente" });
            } else {
                res.status(400).json({ status: "error", error: "Error al actualizar" });
            }
        });
});


module.exports = router;