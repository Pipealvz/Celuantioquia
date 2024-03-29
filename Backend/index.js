"use strict";

const express = require("express");
const app = express();
const db = require("./database/connection");
const morgan = require("morgan");
const cors = require("cors");

const auth = require("./routes/auth");
const productos = require("./routes/productos");
const proveedor = require("./routes/proveedor");
const categoria = require("./routes/categoria");
const empleado = require("./routes/empleado");
const cliente = require("./routes/cliente");
const rol = require("./routes/roles");
const uploadImage = require("./routes/uploadImage");
const tipo_documento = require("./routes/tipo_documentos");



// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Rutas
app.use('/auth', auth);
app.use('/producto', productos);
app.use('/proveedor', proveedor);
app.use('/categoria', categoria);
app.use('/empleado', empleado);
app.use("/cliente", cliente);
app.use("/uploadImage", uploadImage);
app.use('/rol', rol);
app.use('/documento', tipo_documento);




// Configuramos el puerto
app.set("port", process.env.PORT || 5000);

// Verificamos conexión bd
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Conectado a la base de datos ${app.get("host")}`);
  }
});

// Levantamos el servidor
app.listen(app.get("port"), () => {
  console.log(`Aplicación corriendo en el puerto ${app.get("port")}!!`);
});

module.exports = app;
