const express = require("express");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerSpecs = require("./swagger.config");
const cors = require("cors");

// Importar rutas
const authRoutes = require("./routes/auth.routes");
const vacaRoutes = require("./routes/vaca.routes");

const port = process.env.PORT || 3000;

// Conectando a MongoDB
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://oscpalma_db_user:F0398OJZYDSXT8Im@cluster0.a60lnid.mongodb.net/gestion-bovina?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("✗ Error al conectar a MongoDB:", error));

// Middleware
app.use(express.json());
app.use(cors());

// Swagger Documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API Gestión Bovina"
}));

// Rutas
app.use("/", authRoutes);
app.use("/vacas", vacaRoutes);

// Middleware de manejo de errores
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
  res.status(404).json({ message: "Endpoint no encontrado" });
});

// Iniciando el servidor
app.listen(port, () => {
  console.log(`Listen on port: ${port}`);
  console.log(`Swagger: http://localhost:${port}/api-docs\n`);
});