import Ticket from '../models/ticket.js';
import {bcrypt, saltRounds } from '../configs/bcrypt.js';

export const addTicket = async (req, res) => {
    const {
      tTitle,
      tType,
      tContent,
      tDate,
      tReply,
      tReplyDate,
      tStatus,
    } = req.body;
  
    const newTicket = new Ticket({
      tTitle,
      tType,
      tContent,
      tDate,
      tReply,
      tReplyDate,
      tStatus
    });
  
    await newTicket
      .save()
      .then(() => {
        //body
        res.json("New Ticket added Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  
  //view all tickets placed
  
  // const getAllTickets = async (req, res, next) => {
  //   const{min, max, ...others} = req.query;
  //   try{
  //      const hotels = await hotelModel.find({...others,
  //         cheapestPrice:{$gt:min | 1 ,$lt:max || 100000},
  //         });
  //     res.status(200).json(hotels);
  //   }catch(err){
  //     next(err);
  //   }
  // };
  
  export const getAllTickets = async (req, res, next) => {
    try {
      const tickets = await ticketModel.find().sort({ createdAt: -1 });
      res.status(200).json(tickets);
    } catch (err) {
      next(err);
    }
  };
  
  //update the ticket details
  
  export const updateTicket = async (req, res) => {
    let ticketID = req.params.id;
    const {
      tTitle,
      tType,
      tContent,
      tDate,
      tReply,
      tReplyDate,
      tStatus,
    } = req.body;
  
    const updateTickets = {
      tTitle,
      tType,
      tContent,
      tDate,
      tReply,
      tReplyDate,
      tStatus,
    };
  
    const update = await ticketModel
      .findByIdAndUpdate(ticketID, updateTickets)
      .then(() => {
        res.status(200).send({ status: "Ticket information updated" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with updating data", error: err.message });
      });
  };
  
  //remove the ticket from the system
  
  export const deleteTicket = async (req, res) => {
    let ticketID = req.params.id;
  
    await ticketModel
      .findByIdAndDelete(ticketID)
      .then(() => {
        res.status(200).send({ status: "Ticket deleted" });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Error with deleting Ticket", error: err.message });
      });
  };
  
  //view details of one hotel
  
  // const getOneHotel = async (req, res) => {
  //   let hotelID = req.params.id;
  //   const hotel_s = await hotelModel
  //     .findById(hotelID)
  //     .then((deli) => {
  //       res.status(200).send({ status: "Hotel  selected", deli });
  //     })
  //     .catch((err) => {
  //       console.log(err.messsage);
  //       res.status(500).send({ status: "Error", error: err.message });
  //     });
  // };
  
  export const getOneTicket = async (req, res, next) => {
    try {
      const ticket = await ticketModel.findById(req.params.id);
      res.status(200).json(ticket);
    } catch (err) {
      next(err);
    }
  };
  
  
  
  
  
  