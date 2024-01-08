const mongoose = require('mongoose');
const Ticket = require('../models/ticket');

class TicketController {
  async getAllTickets(req, res) {
    try {
      const tickets = await Ticket.find();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async filterTickets(req, res) {
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
  }

  async getTicketById(req, res) {
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
  }

  async createTicket(req, res) {
    try {
      const newTicket = await Ticket.create(req.body);
      res.status(201).json(newTicket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTicket(req, res) {
    try {
      const ticketId = req.params.id;
      const updates = req.body;

      if (!mongoose.Types.ObjectId.isValid(ticketId)) {
        return res.status(400).json({ message: 'ID de ticket no válido' });
      }

      const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, updates, { new: true });

      if (!updatedTicket) {
        return res.status(404).json({ message: 'Ticket no encontrado' });
      }

      res.json(updatedTicket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTicket(req, res) {
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
  }
}

module.exports = new TicketController();
