const express = require("express");
const app = express();
// Modelos de datos
const Vaca = require("./controller/vaca.controller");
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

app.get("/vacas", Vaca.list);
app.get("/vacas/desactivadas", Vaca.listDelete);
// app.get("/vacas/diio/:diio", Vaca.getByDiio); // Obtener vaca por DIIO
app.get("/vacas/:id", Vaca.getById); // Obtener vaca por ID
app.post("/vacas", Vaca.create);
app.put("/vacas/:id", Vaca.update);
app.patch("/vacas/:id", Vaca.update);
app.delete("/vacas/:id", Vaca.destroy);

// Iniciando el servidor
app.listen(port, () => {
  console.log(`Listen on port: ${port}`);
});
