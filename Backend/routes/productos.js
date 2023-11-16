"use strict";

const express = require("express");
const router = express.Router();
const db = require("../database/connection");


//Crear producto
/* router.post('/crearProducto', async (req, res) => {
    const { nombre_producto, tipo_producto, precio, descripcion, producto_destacado, cantidad } = req.body;

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
                        cantidad: cantidad,
                        descripcion: descripcion,
                        producto_destacado: producto_destacado
                    },
                    (error, result) => {
                        if (error) {
                            return res
                                .status(500)
                                .json({ status: 'error', error: 'Ha ocurrido un error en el servidor' });
                        }
                    });
            }
        });
    // }
}); */

router.post('/crearProducto', async (req, res) => {
    const { nombre_producto, tipo_producto, cantidad, precio, descripcion, producto_destacado } = req.body;

    const newDate = new Date();
    const fecha = newDate.toLocaleDateString();
    const hora = newDate.toLocaleTimeString();
    
    if (!nombre_producto || !tipo_producto || !cantidad || !precio || !descripcion || !producto_destacado ) return res.status(400).json({ status: "error", error: "Por favor envia datos" });

    else {
        db.query("SELECT nombre_producto FROM producto WHERE nombre_producto = ?;", [nombre_producto], async (err, result) => {
            if (err) return console.log(err, result);
            if (result[0]) return res.status(400).json({ status: "error", error: "Ya existe un producto con este nombre" })
            else {
                db.query("INSERT INTO producto SET ?", {
                    nombre_producto: nombre_producto,
                    tipo_producto: tipo_producto,
                    cantidad: cantidad,
                    precio: precio,
                    descripcion: descripcion,
                    producto_destacado: producto_destacado
                }, (error, result) => {
                    if (error) return console.log(error, result);
                    return res.json({ status: "success", success: "El producto se registró correctamente" }).status(200);
                });
            }
        });
    }
});


/* function ultimoidProducto() {
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
} */


//Mostar Productos
router.post('/nuestrosProductos', async (req, res) => {
    db.query('SELECT prd.*, cat.nombre_categoria FROM producto prd INNER JOIN categoria cat ON prd.tipo_producto = cat.id_categoria ORDER BY prd.id_producto ASC', (err, rows, result) => {
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

    const { id_producto, nombre_producto, tipo_producto, cantidad, precio, descripcion,
        producto_destacado } = req.body;

    db.query('UPDATE producto SET nombre_producto = ?, tipo_producto = ?, precio = ?, cantidad =?, descripcion = ?, producto_destacado = ?  WHERE id_producto = ?',
        [nombre_producto, tipo_producto, cantidad, precio, descripcion, producto_destacado, id_producto],
        async (err, result) => {
            if (!err) {
                res.json({ status: "success", error: "Se Actualizo Correctamente el producto" });
                console.log(res)
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

router.post('/agregarCompra', async (req, res) => {
    const { id_producto, id_proveedor, fecha_compra, precio_compra, cantidad_compra, detalle_compra } = req.body;

    const newDate = new Date();
    const fecha = newDate.toLocaleDateString();
    const hora = newDate.toLocaleTimeString();

    if (!id_producto || !id_proveedor || !fecha_compra || !precio_compra || !cantidad_compra || !detalle_compra) return res.status(400).json({ status: "error", error: "Por favor envia datos" });

    else {
        db.query("INSERT INTO movimiento_producto SET ?", {
            id_producto: id_producto,
            id_proveedor: id_proveedor,
            fecha_compra: `${fecha} ${hora}`,
            precio_compra: precio_compra,
            cantidad_compra: cantidad_compra,
            detalle_compra: detalle_compra

        }, (error, result, rows) => {
            if (error) return console.log(error, result);
            console.log(rows);
            return res.json({ status: "success", success: "El movimiento se registró correctamente" }).status(200);

        });
    }
});

router.post('/mostrarCompras', async (req, res) => {
    db.query("SELECT mvp.*, prd.nombre_producto FROM movimiento_producto mvp INNER JOIN producto prd ON mvp.id_producto = prd.id_producto;", (err, rows, result) => {
        if (!err) {
            res.json(rows);
        } else {
            res.status(400).json({ status: "error", error: "Error al consultar datos" });
            console.log(err);
        }
    });
});

module.exports = router;