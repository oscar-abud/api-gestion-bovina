const express = require("express");
const app = express();
// Modelos de datos
const Vaca = require("./controller/vaca.controller");
const { Auth, isAuthenticated } = require("./controller/auth.controller");
const port = 3000;
const cors = require("cors");
// conectandose a MONGODB
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://oscpalma_db_user:5RHAgojUjiOnGNQE@cluster0.a60lnid.mongodb.net/gestion-bovina?appName=Cluster0"
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB: ", error));

// Middleware para procesar JSON
app.use(express.json());
app.use(cors());

// API PARA LAS VACAS
app.get("/vacas", isAuthenticated, Vaca.list);
app.get("/vacas/all", isAuthenticated, Vaca.getAll);
app.get("/vacas/desactivadas", isAuthenticated, Vaca.listDelete);
app.get("/vacas/:id", isAuthenticated, Vaca.getById); // Obtener vaca por ID
app.post("/vacas", isAuthenticated, Vaca.create);
app.put("/vacas/:id", isAuthenticated, Vaca.update);
app.patch("/vacas/:id", isAuthenticated, Vaca.update);
app.delete("/vacas/:id", isAuthenticated, Vaca.destroy);

// API PARA EL USUARIO LOGIN Y REGISTER
app.post("/login", Auth.login);
app.post("/register", Auth.register);

// Middleware de manejo de errores (incluye errores de express-jwt)
app.use((err, req, res, next) => {
  // Errores de autenticación de express-jwt
  if (err.name === "UnauthorizedError") {
    return res
      .status(401)
      .json({ message: "No estás autorizado. Token inválido o ausente." });
  }

  console.error("Error no controlado:", err);
  res.status(500).json({ message: "Error interno del servidor" });
});

// 404
app.use((req, res) => {
  res.status(404).send({ message: "Endpoint no encontrado" });
});

// Iniciando el servidor
app.listen(port, () => {
  console.log(`Listen on port: ${port}`);
});
