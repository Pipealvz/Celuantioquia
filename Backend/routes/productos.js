"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");



//Crear producto
router.post('/crearProducto', async (req, res) => {
    const { nombre_producto, tipo_producto, precio, descripcion, producto_destacado, cantidad} = req.body;


    // if (!nombre_producto || !tipo_producto || !precio || !descripcion || !producto_destacado) {
    //     return res
    //         .status(400)
    //         .json({ status: 'error', error: 'Por favor envía datos' });
    // } else {

        db.query(
            'SELECT nombre_producto FROM producto WHERE nombre_producto = ?;',
            [nombre_producto],
            async (err, result) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ status: 'error', error: 'Ha ocurrido un error en el servidor' });
                }
                if (result[0]) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'Ya se ha registrado un producto con este nombre'
                    });
                } else {
                    db.query(
                        'INSERT INTO producto SET ?;',
                        {
                            nombre_producto: nombre_producto,
                            tipo_producto: tipo_producto,
                            precio: precio,
                            descripcion: descripcion,
                            producto_destacado: producto_destacado
                        },
                        (error, result) => {
                            if (error) {
                                return res
                                    .status(500)
                                    .json({ status: 'error', error: 'Ha ocurrido un error en el servidor' });
                            } else {

                        var ultimo_id = ultimoidProducto();  
                        var id_producto_fk =  ultimo_id.ultimoId;    
                    db.query(
                        'INSERT INTO inventario SET ?;',
                        {
                            cantidad: cantidad,
                            id_producto_fk: id_producto_fk
                        },
                        (err, result) => {
                            if (err) {
                                return res
                                    .status(500)
                                    .json({ status: 'error', error: 'Ha ocurrido un error en el servidor' });
                            }
                            return res.json({
                                status: 'success',
                                success: 'El producto se ha registrado'
                            });
                        });
                            }
                        });
                }
            });
    // }
});


function ultimoidProducto() {
    db.query(
        'SELECT MAX(id_producto) AS ultimo_id FROM producto',
        (err, result) => {
            if (err) {
                return res.status(500).json({ status: 'error', error: 'Ha ocurrido un error en el servidor' });
            }

            const ultimoId = result[0].ultimo_id;
            return res.json({
                status: 'success',
                ultimoId: ultimoId
            });
        }
    );
}


//Mostar Productos
router.post('/nuestrosProductos', async (req, res) => {
    db.query('SELECT * FROM producto;', (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

//Mostar Inventario
router.post('/inventario', async (req, res) => {
    db.query('SELECT prd.nombre_producto, cat.nombre_categoria, prd.precio, prd.descripcion, inv.cantidad_producto, prv.nombre_proveedor, prv.correo_proveedor, prv.contacto_proveedor, prv.nit_proveedor FROM inventario inv INNER JOIN producto prd ON inv.id_producto_fk = prd.id_producto INNER JOIN proveedor prv ON inv.id_proveedor_fk = prv.id_proveedor INNER JOIN categoria cat ON prd.tipo_producto = cat.id_categoria', (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

//Mostar Catalogo
router.post('/catalogo', async (req, res) => {
    db.query('SELECT prd.nombre_producto, cat.nombre_categoria, prd.precio, prd.descripcion, inv.cantidad_producto FROM inventario inv INNER JOIN producto prd ON inv.id_producto_fk = prd.id_producto INNER JOIN categoria cat ON prd.tipo_producto = cat.id_categoria', (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

//Eliminar producto
router.post('/eliminarProducto', async (req, res) => {

    const { id_producto } = req.body;
    db.query('SELECT id_producto FROM producto WHERE id_producto = ?', [id_producto], async (err, result) => {
        if (err) return err;
        if (!result[0]) return res.status(400).json({ status: "error", error: "No existe un producto con este Id" })
        else {
            db.query('DELETE FROM producto WHERE id_producto = ? ', [id_producto], async (err, result) => {
                if (!err) {
                    res.json({ status: "success", error: "Se Elimino Correctamente el producto" });
                } else {
                    res.status(400).json({ status: "error", error: "Error al eliminar" });
                }
            });
        }
    });
});


//Actualizar producto
router.post('/actualizarProducto', async (req, res) => {

    const { id_producto, nombre_producto, tipo_producto, precio, descripcion,
        producto_destacado } = req.body;

    const { id_inventario, cantidad } = req.body;

    db.query('UPDATE producto SET nombre_producto = ?, tipo_producto = ?, precio = ?, descripcion = ?, producto_destacado = ?  WHERE id_producto = ?',
        [nombre_producto, tipo_producto, precio, descripcion, producto_destacado, id_producto],
        async (err, result) => {
            if (!err) {
                res.json({ status: "success", error: "Se Actualizo Correctamente el producto" });
            } else {
                res.status(400).json({ status: "error", error: "Error al actualizar" });
            }
        });
    db.query('UPDATE inventario SET cantidad = ?,  WHERE id_inventario = ?',
        [cantidad],
        async (err, result) => {
            if (!err) {
                res.json({ status: "success", error: "Se Actualizo Correctamente el producto" });
            } else {
                res.status(400).json({ status: "error", error: "Error al actualizar" });
            }
        });
});


//Mostar Productos por id
router.post('/productoPorId', async (req, res) => {

    const { id_producto } = req.body;

    db.query('SELECT * FROM producto  WHERE id_producto = ?', [id_producto], async (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
        }
    });
});

module.exports = router;