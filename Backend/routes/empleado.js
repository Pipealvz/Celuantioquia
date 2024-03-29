"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");


//Crear Empleado
router.post('/crearEmpleado', async (req, res) => {
    const { nombre_empleado, rol_empleado, documento_identidad, tipo_documento, direccion_empleado, telefono_empleado,
        fecha_nacimiento_empleado, correo_empleado, contraseña_empleado } = req.body;

    if (!nombre_empleado || !rol_empleado || !documento_identidad || !tipo_documento || !direccion_empleado || !telefono_empleado
        || !fecha_nacimiento_empleado || !correo_empleado || !contraseña_empleado) return res.status(400).json({ status: "error", error: "Por favor envia datos" });

    else {
        db.query("SELECT documento_identidad FROM empleado WHERE documento_identidad = ?", [documento_identidad], async (err, result) => {
            if (err) return err;
            if (result[0]) return res.status(400).json({ status: "error", error: "Ya se ha registrado un empleado con este documento de identidad" })

            else {
                db.query("INSERT INTO empleado SET ?", {
                    nombre_empleado: nombre_empleado,
                    rol_empleado: rol_empleado,
                    documento_identidad: documento_identidad,
                    tipo_documento: tipo_documento,
                    direccion_empleado: direccion_empleado,
                    telefono_empleado: telefono_empleado,
                    fecha_nacimiento_empleado: fecha_nacimiento_empleado,
                    correo_empleado: correo_empleado,
                    contraseña_empleado: contraseña_empleado
                }, (error, result) => {
                    if (error) return error;
                    return res.json({ status: "success", success: "La Empleado se ha registrado" });
                });
            }
        });
    }
});


//Mostar Empleado
router.post('/nuestrosEmpleados', async (req, res) => {
    db.query('SELECT emp.*, tdc.nombre_documento FROM empleado emp INNER JOIN tipo_documento tdc ON emp.tipo_documento = tdc.id_documento;', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }

    });
});

//Mostar Empleado por id
router.post('/empleadoPorId', async (req, res) => {

    const { id_empleado } = req.body;

    db.query('SELECT * FROM empleado  WHERE id_empleado = ?', [id_empleado], async (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

//Eliminar Empleado
router.post('/eliminarEmpleado', async (req, res) => {

    const { id_empleado } = req.body;
    db.query('SELECT id_empleado FROM empleado WHERE id_empleado = ?', [id_empleado], async (err, result) => {
        if (err) return err;
        if (!result[0]) return res.json({ status: "error", error: "No existe un empleado con este Id" })
        else {
            db.query('DELETE FROM empleado WHERE id_empleado = ? ', [id_empleado], async (err, result) => {
                if (!err) {
                    res.json({ status: "success", error: "Se Elimino Correctamente el empleado" });
                } else {
                    res.status(400).json({ status: "error", error: "Error al eliminar" });
                }
            });
        }
    });
});

//Actualizar Empleado
router.post('/actualizarEmpleado', async (req, res) => {
    const { id_empleado, nombre_empleado,
        rol_empleado,
        documento_identidad,
        tipo_documento,
        direccion_empleado,
        telefono_empleado,
        fecha_nacimiento_empleado,
        correo_empleado,
        contraseña_empleado } =
        req.body;

    db.query('UPDATE empleado SET nombre_empleado= ?,rol_empleado=?,documento_identidad=?,tipo_documento =?,direccion_empleado=?,telefono_empleado=?,fecha_nacimiento_empleado=?,correo_empleado=?,contraseña_empleado=? WHERE id_empleado = ?',
        [nombre_empleado,
            rol_empleado,
            documento_identidad,
            tipo_documento,
            direccion_empleado,
            telefono_empleado,
            fecha_nacimiento_empleado,
            correo_empleado,
            contraseña_empleado,
            id_empleado],
        async (err, result) => {
            if (!err) {
                res.json({ status: "success", error: "Se Actualizo Correctamente el Empleado" });
            } else {
                res.status(400).json({ status: "error", error: "Error al actualizar" });
            }
        });
});




module.exports = router;