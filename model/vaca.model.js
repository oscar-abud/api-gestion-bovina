const mongoose = require("mongoose");

const VacaShcema = mongoose.model("Vaca", {
  diio: { type: Number, required: true, unique: true },
  dateBirthday: { type: Date, required: true },
  genre: { type: String, required: true, enum: ["F", "M"] },
  race: { type: String, required: true },
  location: { type: String, required: true },
  sick: { type: String, default: null, maxlength: 150 },
  cowState: { type: Boolean, required: true, default: true },
});

module.exports = VacaShcema;
