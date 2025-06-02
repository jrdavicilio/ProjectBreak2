const mongoose = require('mongoose');

const validColors = ['Rojo', 'Azul', 'Verde', 'Negro', 'Blanco'];

const productSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  color: { type: String, enum: validColors, required: true },
  price: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Product', productSchema);
module.exports.validColors = validColors;   // exportado solo si lo necesitas en otros archivos