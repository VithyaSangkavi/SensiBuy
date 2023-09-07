import mongoose from 'mongoose';

const { Schema } = mongoose;

const newTicket = new Schema({
      tTitle: {
        type: String,
        required: true,
      },
      tType: {
        type: String,
        required: true,
      },
    
      tContent: {
        type: String,
        required: true,
      },
    
      tDate: {
        type: Date,
        required: true,
      },
      tReply: {
        type: String,
        required: true,
      },
      tReplyDate: {
        type: Date,
        required: true,
      },
      tStatus: {
        type: String,
        required: true,
      },
});

const Ticket = mongoose.model('Ticket', newTicket);

export default Ticket;
