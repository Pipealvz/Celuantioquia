"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");



//Crear Producto
router.post('/crearProducto', async (req, res) => {
    const { nombre_producto, tipo_producto, cantidad, precio, descripcion,
        producto_destacado } = req.body;

    if (!nombre_producto || !tipo_producto || !cantidad || !precio || !descripcion
        || !producto_destacado) return res.json({ status: "error", error: "Por favor envia datos" });

    else {
        db.query("SELECT nombre_producto FROM Producto WHERE nombre_producto = ?;", [nombre_producto], async (err, result) => {
            if (err) return err;
            if (result[0]) return res.json({ status: "error", error: "Ya se ha registrado un producto con este nombre" })

            else {
                db.query("INSERT INTO Producto SET ?", {
                    nombre_producto: nombre_producto,
                    tipo_producto: tipo_producto,
                    cantidad: cantidad,
                    precio: precio,
                    descripcion: descripcion,
                    producto_destacado: producto_destacado
                }, (error, result) => {
                    if (error) return error;
                    return res.json({ status: "success", success: "El Producto se ha registrado" });
                });
            }
        });
    }
});


//Mostar Productos
router.post('/nuestrosProductos', async (req, res) => {
     db.query('SELECT * FROM Producto;', (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

//Eliminar producto
router.post('/eliminarProducto', async (req, res) => {

    const { id_producto } = req.body;
    db.query('SELECT id_producto FROM Producto WHERE id_producto = ?', [id_producto], async (err, result) => {
        if (err) return err;
        if (!result[0]) return res.json({ status: "error", error: "No existe un producto con este Id" })
        else {
            db.query('DELETE FROM Producto WHERE id_producto = ? ', [id_producto], async (err, result) => {
                if (!err) {
                    res.json({ status: "success", error: "Se Elimino Correctamente el Producto" });
                } else {
                    res.json({ status: "error", error: "Error al eliminar" });
                }
            });
        }
    });
});


//Actualizar producto
router.post('/actualizarProducto', async (req, res)=>{

    const { id_producto ,nombre_producto, tipo_producto, cantidad, precio, descripcion,
        producto_destacado } = req.body;

        db.query('UPDATE Producto SET nombre_producto = ?, tipo_producto = ?, cantidad = ?, precio = ?, descripcion = ?, producto_destacado = ?  WHERE id_producto = ?',
        [nombre_producto, tipo_producto, cantidad, precio, descripcion, producto_destacado, id_producto],
        async (err, result)=> {
            if (!err) {
                res.json({ status: "success", error: "Se Actualizo Correctamente el Producto" });
            } else {
                res.json({ status: "error", error: "Error al actualizar" });
            }
        });
});


//Mostar Productos por id
router.post('/productoPorId', async (req, res) => {

    const { id_producto } = req.body;
    
    db.query('SELECT * FROM Producto  WHERE id_producto = ?',[id_producto] , async (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

module.exports = router;