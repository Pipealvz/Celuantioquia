"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");


//Crear Categoria
router.post('/crearCategoria', async (req, res) => {
    const { nombre_categoria, tipo_categoria, prioridad_categoria } = req.body;

    if (!nombre_categoria || !tipo_categoria || !prioridad_categoria) return   res.status(400).json({ status: "error", error: "Por favor envia datos" });

    else {
        db.query("SELECT nombre_categoria FROM Categoria WHERE nombre_categoria = ?", [nombre_categoria], async (err, result) => {
            if (err) return err;
            if (result[0]) return  res.status(400).json({ status: "error", error: "Ya se ha registrado una categoria con este nombre" })

            else {
                db.query("INSERT INTO Categoria SET ?", {
                    nombre_categoria: nombre_categoria,
                    tipo_categoria: tipo_categoria,
                    prioridad_categoria: prioridad_categoria
                }, (error, result) => {
                    if (error) return error;
                    return res.json({ status: "success", success: "La Categoria se ha registrado" });
                });
            }
        });
    }
});


//Mostar Categorias
router.post('/nuestrasCategorias', async (req, res) => {
    db.query('SELECT * FROM Categoria;', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }

    });
});

//Mostar Categorias por id
router.post('/empleadoPorId', async (req, res) => {

    const { id_categoria } = req.body;
    
    db.query('SELECT * FROM Categoria  WHERE id_categoria = ?',[id_categoria] , async (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

//Eliminar Categorias
router.post('/eliminarCategorias', async (req, res) => {

    const { id_categoria } = req.body;
    db.query('SELECT id_categoria FROM Categoria WHERE id_categoria = ?', [id_categoria], async (err, result) => {
        if (err) return err;
        if (!result[0]) return   res.status(400).json({ status: "error", error: "No existe un empleado con este Id" })
        else {
            db.query('DELETE FROM Categoria WHERE id_categoria = ? ', [id_categoria], async (err, result) => {
                if (!err) {
                    res.json({ status: "success", error: "Se Elimino Correctamente el empleado" });
                } else {
                    res.status(400).json({ status: "error", error: "Error al eliminar" });
                }
            });
        }
    });
});


//Actualizar Categorias
router.post('/actualizarCategoria', async (req, res)=>{
    const {id_categoria, nombre_categoria, tipo_categoria, prioridad_categoria } = req.body;

        db.query('UPDATE Categoria SET  nombre_categoria = ?, tipo_categoria = ?, prioridad_categoria = ? WHERE id_categoria = ?',
        [ nombre_categoria, tipo_categoria, prioridad_categoria, id_categoria],
        async (err, result)=> {
            if (!err) {
                res.json({ status: "success", error: "Se Actualizo Correctamente la Categoria" });
            } else {
                res.status(400).json({ status: "error", error: "Error al actualizar" });
            }
        });
});


module.exports = router;