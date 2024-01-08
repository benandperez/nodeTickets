const express = require('express');

const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const port = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/tickets')
  .then(() => console.log('Connected!'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

// Definir el modelo del ticket
const ticketSchema = new mongoose.Schema({
    user: { type: String, default: 'Prueba' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['abierto', 'cerrado'], default: 'abierto' },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// Rutas HTTP RESTful
app.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tickets/filter', async (req, res) => {
    try {
      
      const { page = 1, limit = 10, name } = req.query;
      let query = {};
  
      if (name) {
        query = { user: { $regex: new RegExp(name, 'i') } };
      }
  
      const tickets = await Ticket.find(query)
        .limit(limit)
        .skip((page - 1) * limit);
  
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.get('/tickets/:id', async (req, res) => {
try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
    res.status(404).json({ message: 'Ticket no encontrado' });
    } else {
    res.json(ticket);
    }
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

app.post('/tickets', async (req, res) => {
  try {
    const newTicket = await Ticket.create(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/tickets/:id', async (req, res) => {
    try {
      const ticketId = req.params.id;
      const updates = req.body;

      
  
      // Asegúrate de que el ID sea válido antes de intentar la actualización
      if (!mongoose.Types.ObjectId.isValid(ticketId)) {
        return res.status(400).json({ message: 'ID de ticket no válido' });
      }
  
      // Realiza la actualización y obtén el ticket actualizado
      const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, updates, { new: true });

      console.log(ticketId,
        updates, updatedTicket);
  
      // Verifica si se encontró el ticket y se actualizó correctamente
      if (!updatedTicket) {
        return res.status(404).json({ message: 'Ticket no encontrado' });
      }
  
      // Si todo está bien, responde con el ticket actualizado
      res.json(updatedTicket);
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la actualización
      res.status(500).json({ error: error.message });
    }
  });

app.delete('/tickets/:id', async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      res.status(404).json({ message: 'Ticket no encontrado' });
    } else {
      res.json(deletedTicket);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
