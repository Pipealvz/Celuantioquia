"use strict";

const express = require ("express");
const app = express();
const db = require("./database/connection");
const morgan = require("morgan")
const cors = require("cors")

const auth = require("./routes/auth");

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Rutas
app.use('/', auth);

// Configuramos el puerto
app.set("port", process.env.PORT || 5000);

// Verificamos conexión bd
db.connect((err) =>{
    if(err) throw err;
    console.log("Conectado a la base de datos");
});

// Levantamos el servidor
app.listen(app.get("port"), () => {
  console.log(`Aplicación corriendo en el puerto ${app.get("port")}!!`);
});

module.exports = app;
