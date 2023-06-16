"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database/connection");
const jwt = require("jsonwebtoken");

// Login
router.post("/login", async (req, res) => {


    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) return res.json({ status: "error", error: "Por favor envia datos" });
    else {
        try {
            db.query("SELECT * FROM Usuario WHERE correo = ?", [correo], async (err, result) => {
                console.log(result)
                if (err) return err;
                if (!result[0]) return res.status(400).json({ status: "error", error: "Correo o contraseña incorrectos" })
                else {
                    const contraseñaValida = await bcrypt.compare(contrasena, result[0].contrasena)
                    if (!contraseñaValida) return res.status(400).send('El correo o la contraseña son incorrectos');
                    else {
                        const token = jwt.sign({ id: result[0].id}, process.env.JWTSECRETKEY, {
                            expiresIn: process.env.JWTEXPIRES
                        });
                        res.send({ "AuthToken: ": token });
                        res.status(200);
                    }
                }
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }
});

// Register administrador/Empleado
router.post("/register", async (req, res) => {

    const { nombre_empleado, documento_identidad, tipo_documento, direccion_empleado, telefono_empleado,
        fecha_nacimiento_empleado, correo_empleado, contraseña_empleado } = req.body;

    if (!nombre_empleado  || !documento_identidad || !tipo_documento || !direccion_empleado || !telefono_empleado
        || !fecha_nacimiento_empleado || !correo_empleado || !contraseña_empleado) return   res.status(400).json({ status: "error", error: "Por favor envia datos" });
    else {
        db.query("SELECT correo FROM usuario WHERE correo = ?", [correo_empleado], async (err, result) => {
            if (err) return err;
            if (result[0]) return   res.status(400).json({ status: "error", error: "El correo ya ha sido registrado" })
            else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(contraseña_empleado, salt, function(err, hash) {
                        db.query("INSERT INTO usuario SET ?", { nombre: nombre_empleado, correo: correo_empleado, contrasena: hash, rol_usuario: 5 }, (error, result) => {
                            if (err) {
                                return res.json({ status: "error", error: "El usuario no ha sido registrado" });
                            } else {
                                db.query("INSERT INTO empleado SET ?", {
                                    nombre_empleado: nombre_empleado,
                                    documento_identidad: documento_identidad,
                                    tipo_documento: tipo_documento,
                                    direccion_empleado: direccion_empleado,
                                    telefono_empleado: telefono_empleado,
                                    fecha_nacimiento_empleado: fecha_nacimiento_empleado,
                                    correo_empleado: correo_empleado,
                                    contraseña_empleado: contraseña_empleado
                                }, (error, result) => {
                                    if (error) return error;
                                    return   res.json({ status: "success", success: "La Empleado se ha registrado" });
                                }); 
                            }                           
                        });
                    });
                });
            }
        });
    }
});



// Register cliente/Usuario
router.post("/registerCli", async (req, res) => {

    const { nombre, documento, tipo_documento ,direccion, telefono , correo, contrasena } = req.body;

    if ( !nombre || !documento || !tipo_documento || !direccion||  !telefono  || !correo || !contrasena ) return res.status(400).json({ status: "error", error: "Por favor envia datos" });
    else {
        db.query("SELECT correo FROM usuario WHERE correo = ?", [correo], async (err, result) => {
            if (err) return err;
            if (result[0]) return   res.status(400).json({ status: "error", error: "El correo ya ha sido registrado" })
            else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(contrasena, salt, function(err, hash) {
                        db.query("INSERT INTO cliente SET ?", { nombre_cliente: nombre, documento_cliente: documento,tipo_documento_cliente: tipo_documento ,direccion_vivienda: direccion,telefono_contacto: telefono, correo_cliente: correo, contrasena_cliente: hash, rol_usuario: 0 }, (error, result) => {
                            if (err) {
                                return res.json({ status: "success", success: "El cliente ha sido registrado" });
                            } else {
                                db.query("INSERT INTO usuario SET ?", { nombre: nombre, correo: correo, contrasena: hash, rol_usuario: 0 }, (error, result) => {
                                    if (error) return error;
                                    return res.json({ status: "success", success: "El usuario ha sido registrado" });
                                });
                            }                            
                        })                   
                    });
                }); 
                
            }
        });
    }
});


module.exports = router;