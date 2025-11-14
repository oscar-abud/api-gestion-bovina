const mongoose = require("mongoose");
const Vacas = require("../model/vaca.model");

const Vaca = {
  list: async (req, res) => {
    try {
      const filter = { cowState: true };
      // add querys to filters
      const { diio, genre } = req.query;

      if (diio) filter.diio = Number(diio);
      if (genre) filter.genre = genre;

      const vacas = await Vacas.find(filter);
      if (vacas.length === 0) {
        return res.status(404).send("No hay vacas registradas");
      }
      res.status(200).send(vacas);
    } catch (error) {
      res.status(500).send("Error al obtener las vacas");
      console.error(error);
    }
  },
  listDelete: async (req, res) => {
    try {
      const filter = { cowState: false };
      // add querys to filters
      const { diio, genre } = req.query;

      if (diio) filter.diio = Number(diio);
      if (genre) filter.genre = genre;

      const vacasEliminadas = await Vacas.find(filter);
      // Validando si hay vacas eliminadas
      if (vacasEliminadas.length === 0) {
        return res.status(404).send("No hay vacas eliminadas");
      }
      res.status(200).send(vacasEliminadas);
    } catch (error) {
      res.status(500).send("Error al obtener las vacas eliminadas");
      console.error(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`El ID '${id}' no es válido`);
      }
      const vaca = await Vacas.findOne({ _id: id, cowState: true });
      if (!vaca) {
        return res.status(404).send(`No se encontró la vaca con ID '${id}'`);
      }
      res.status(200).send(vaca);
    } catch (error) {
      res.status(500).send("Error al obtener la vaca por ID");
      console.error(error);
    }
  },
  create: async (req, res) => {
    try {
      const newVaca = new Vacas(req.body);
      // Validando que la vaca no exista
      const vacaExiste = await Vacas.findOne({ diio: newVaca.diio });
      if (vacaExiste) {
        return res
          .status(400)
          .send(`Ya existe una vaca con el DIIO '${newVaca.diio}'`);
      }
      await newVaca.save();
      res
        .status(201)
        .send(`¡Vaca con DIIO '${newVaca.diio}' creada con éxito!`);
    } catch (error) {
      res.status(500).send("Error al crear la vaca");
      console.error(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`El ID '${id}' no es válido`);
      }
      const vacaExist = await Vacas.findOne({ _id: id, cowState: true });
      if (!vacaExist) {
        return res.status(404).send(`No se encontró la vaca con ID '${id}'`);
      }
      Object.assign(vacaExist, req.body);
      await vacaExist.save();
      res.status(201).send(`¡Vaca con DIIO ${id} actualizada con éxito!`);
    } catch (error) {
      res.status(500).send("Error al actualizar la vaca");
      console.error(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      // Validando que el ID sea valido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`El ID '${id}' no es válido`);
      }
      // Buscamos la vaca y la actualizamos
      const vacaActualizada = await Vacas.findOneAndUpdate(
        { _id: id, cowState: true }, // solo vacas activas
        { cowState: false },
        { new: true }
      );

      if (!vacaActualizada) {
        return res
          .status(404)
          .send(`No se encontró la vaca activa con ID '${id}'`);
      }

      res.status(200).send(`¡Vaca con ID '${id}' eliminada con éxito!`);
    } catch (error) {
      res.status(500).send("Error al eliminar la vaca");
      console.error(error);
    }
  },
};

module.exports = Vaca;
