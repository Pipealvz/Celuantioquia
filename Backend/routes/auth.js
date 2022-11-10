"use strict"

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
                if (err) throw err;
                if (!result[0]) return res.json({ status: "error", error: "Correo o contraseña incorrectos" })
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

// Register
router.post("/register", async (req, res) => {

    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) return res.json({ status: "error", error: "Por favor envia datos" });
    else {
        db.query("SELECT correo FROM Usuario WHERE correo = ?", [correo], async (err, result) => {
            if (err) throw err;
            if (result[0]) return res.json({ status: "error", error: "El correo ya ha sido registrado" })
            else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(contrasena, salt, function(err, hash) {
                        db.query("INSERT INTO Usuario SET ?", { nombre: nombre, correo: correo, contrasena: hash, rol_usuario:  "admin" }, (error, result) => {
                            if (error) throw error;
                            return res.json({ status: "success", success: "El usuario ha sido registrado" });
                        })
                    });
                });
                // const salt = await bcrypt.genSalt(10);
                // const contrasena = bcrypt.hash(contrasenaU, salt);
                // console.log(contrasena)
            }
        });
    }
});




module.exports = router;