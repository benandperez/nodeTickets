const express = require('express');
const TicketController = require('../controllers/TicketController');

const router = express.Router();

router.get('/tickets', TicketController.getAllTickets);
router.get('/tickets/filter', TicketController.filterTickets);
router.get('/tickets/:id', TicketController.getTicketById);
router.post('/tickets', TicketController.createTicket);
router.put('/tickets/:id', TicketController.updateTicket);
router.delete('/tickets/:id', TicketController.deleteTicket);

module.exports = (app) => {
  app.use(router);
};
