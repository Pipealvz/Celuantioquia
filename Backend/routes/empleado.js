"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");


//Crear Empleado
router.post('/crearEmpleado', async (req, res) => {
    const { nombre_empleado, rol_empleado, documento_identidad, tipo_documento, direccion_empleado, telefono_empleado,
        fecha_nacimiento_empleado, correo_empleado, contraseña_empleado } = req.body;

    if (!nombre_empleado || !rol_empleado || !documento_identidad || !tipo_documento || !direccion_empleado || !telefono_empleado
        || !fecha_nacimiento_empleado || !correo_empleado || !contraseña_empleado) return res.json({ status: "error", error: "Por favor envia datos" });

    else {
        db.query("SELECT documento_identidad FROM Empleado WHERE documento_identidad = ?", [documento_identidad], async (err, result) => {
            if (err) throw err;
            if (result[0]) return res.json({ status: "error", error: "Ya se ha registrado un empleado con este documento de identidad" })

            else {
                db.query("INSERT INTO Empleado SET ?", {
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
                    if (error) throw error;
                    return res.json({ status: "success", success: "La Categoria se ha registrado" });
                });
            }
        });
    }
});


//Mostar Empleado
router.post('/nuestrosEmpleados', async (req, res) => {
    db.query('SELECT * FROM Empleado;', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({ status: "error", error: "Error al consultar datos" });
        }

    });
});

//Mostar Empleado por id
router.post('/empleadoPorId', async (req, res) => {

    const { id_empleado } = req.body;

    db.query('SELECT * FROM Empleado  WHERE id_empleado = ?', [id_empleado], async (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

//Eliminar Empleado
router.post('/eliminarEmpleado', async (req, res) => {

    const { id_empleado } = req.body;
    db.query('SELECT id_empleado FROM Empleado WHERE id_empleado = ?', [id_empleado], async (err, result) => {
        if (err) throw err;
        if (!result[0]) return res.json({ status: "error", error: "No existe un empleado con este Id" })
        else {
            db.query('DELETE FROM Empleado WHERE id_empleado = ? ', [id_empleado], async (err, result) => {
                if (!err) {
                    res.json({ status: "success", error: "Se Elimino Correctamente el empleado" });
                } else {
                    res.json({ status: "error", error: "Error al eliminar" });
                }
            });
        }
    });
});

//Actualizar Empleado
router.post('/actualizarProveedor', async (req, res) => {
    const { nombre_empleado, rol_empleado, documento_identidad, tipo_documento, direccion_empleado, telefono_empleado,
        fecha_nacimiento_empleado, correo_empleado, contraseña_empleado } = req.body;

    db.query('UPDATE Empleado SET nombre_empleado = ?, rol = ?, documento_identidad = ?, tipo_documento = ?, direccion_vivienda = ? ,telefono_contacto = ?,fecha_nacimiento = ?, correo_empleado = ? , contraseña_empleado = ?  WHERE id_empleado = ?',
        [nombre_empleado, rol_empleado, documento_identidad, tipo_documento, direccion_empleado, telefono_empleado,
            fecha_nacimiento_empleado, correo_empleado, contraseña_empleado, id_empleado],
        async (err, result) => {
            if (!err) {
                res.json({ status: "success", error: "Se Actualizo Correctamente el Empleado" });
            } else {
                res.json({ status: "error", error: "Error al actualizar" });
            }
        });
});




module.exports = router;