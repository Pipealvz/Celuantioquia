'use strict';

const multer = require('multer');
const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const db = require("../database/connection");



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});

// Configurar multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' });

// Ruta para manejar la carga de imágenes
router.post('/product/:id', upload.single('imagen'), async (req, res) => {
    const id = req.params.id;
    try {
        const fileImage = req.file;
        const fileImagePath = req.file.path;
        if (!fileImage) {
            res.status(400).json({ message: 'Debes cargar un archivo.' });
            return;
        }
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(fileImage.path, {
            folder: 'replit'
        });
        const url_image = result.secure_url;
        // Guardar la URL & public ID de la imagen
        console.log("img:", url_image);
        console.log(id);
        db.query(`UPDATE producto SET url_image = '${url_image}' WHERE id_producto = ${id};`, async (err, result) => {
            if (!err) {
                console.log("Foto Actualizada");
                return;
            } else {
                console.log("Foto No Actualizada");
                return;
            }
        });
        res.status(200).json({ message: 'La imagen se ha subido con éxito.' });
        fs.unlink(fileImagePath, (error) => {
            if (error) {
                console.log("Archivo no borrado");
            } else {
                console.log("Archivo borrado");
            }
        })
    } catch (error) {
        console.error(error);
    }
});

router.post('/deleteProduct/:id', async (req, res) => {
    const id = req.params.id;
    try {

        const filePublicId = `replit/${req.params.id}`;

        if (filePublicId) {
            await cloudinary.uploader.explicit(filePublicId, { type: 'upload' }, (err, res) => {
                if (err) {
                    console.log("La imagen no existe en el servidor.", err);
                } else {
                    cloudinary.uploader.destroy(filePublicId, (err, res) => {
                        console.log(res);
                        console.log("Deleting... image complete :)");
                        db.query(`DELETE producto SET url_image = 'empty' WHERE id_producto = ${id};`, async (err, result) => {
                            if (!err) {
                                console.log("url image is empty :)");
                                return;
                            } else {
                                console.log("Can't update url image");
                                return;
                            }
                        });
                    });
                }
            });
        } else {
            res.status(400).json({ message: 'Hubo un error en el proceso, intente de nuevo.' })
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la imagen');
    }
});
module.exports = router;