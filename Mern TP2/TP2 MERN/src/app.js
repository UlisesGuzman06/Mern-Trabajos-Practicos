require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Usuario = require("./user");

const app = express();

const { MONGO_USER, MONGO_PASS, PORT, MONGO_BD } = process.env;
app.use(express.json());

const mongoUri = `mongodb://${MONGO_USER}:${MONGO_PASS}@localhost:27017/${MONGO_BD}?authSource=admin`;

app.get("/users", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { nombre, edad, email } = req.body;
    const nuevoUsuario = new Usuario({ nombre, edad, email });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

mongoose
  .connect(mongoUri)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//npm run dev
//docker-compose up -d
