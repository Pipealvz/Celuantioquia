"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");


//Crear categoria
router.post('/crearCategoria', async (req, res) => {
    const { nombre_categoria} = req.body;

    if (!nombre_categoria) return   res.status(400).json({ status: "error", error: "Por favor envia datos" });

    else {
        db.query("SELECT nombre_categoria FROM categoria WHERE nombre_categoria = ?", [nombre_categoria], async (err, result) => {
            if (err) return err;
            if (result[0]) return  res.status(400).json({ status: "error", error: "Ya se ha registrado una categoría con este nombre" })

            else {
                db.query("INSERT INTO categoria SET ?", {
                    nombre_categoria: nombre_categoria,
                }, (error, result) => {
                    if (error) return error;
                    return res.json({ status: "success", success: "La categoría se ha registrado" });
                });
            }
        });
    }
});


//Mostar Categorias
router.post('/nuestrasCategorias', async (req, res) => {
    db.query('SELECT * FROM categoria;', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }

    });
});

//Mostar Categorias por id
router.post('/categoriaId', async (req, res) => {

    const { id_categoria } = req.body;
    
    db.query('SELECT * FROM categoria  WHERE id_categoria = ?',[id_categoria] , async (err, rows, result) => {
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
    db.query('SELECT id_categoria FROM categoria WHERE id_categoria = ?', [id_categoria], async (err, result) => {
        if (err) return err;
        if (!result[0]) return   res.status(400).json({ status: "error", error: "No existe la categoría con ese id" })
        else {
            db.query('DELETE FROM categoria WHERE id_categoria = ? ', [id_categoria], async (err, result) => {
                if (!err) {
                    res.json({ status: "success", error: "Se Elimino Correctamente la categoría" });
                } else {
                    res.status(400).json({ status: "error", error: "Error al eliminar" });
                }
            });
        }
    });
});


//Actualizar Categorias
router.post('/actualizarCategoria', async (req, res)=>{
    const {id_categoria, nombre_categoria } = req.body;

        db.query('UPDATE categoria SET  nombre_categoria = ? WHERE id_categoria = ?',
        [ nombre_categoria, id_categoria],
        async (err, result)=> {
            if (!err) {
                res.json({ status: "success", error: "Se actualizó correctamente la categoria" });
            } else {
                res.status(400).json({ status: "error", error: "Error al actualizar" });
            }
        });
});


module.exports = router;