import express from 'express';
const router = express.Router();
import * as ticketController from '../controllers/ticket.js';

//adding a new ticket
router.post("/add", ticketController.addTicket);

//view all tickets
router.get("/", ticketController.getAllTickets);

//update ticket details
router.put("/update/:id", ticketController.updateTicket);

//remove ticket from the system
router.delete("/delete/:id", ticketController.deleteTicket);

//get only one ticket
router.get("/get/:id", ticketController.getOneTicket);

export default router;