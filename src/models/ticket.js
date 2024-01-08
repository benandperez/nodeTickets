const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user: { type: String, default: 'Prueba' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['abierto', 'cerrado'], default: 'abierto' },
});

module.exports = mongoose.model('Ticket', ticketSchema);
