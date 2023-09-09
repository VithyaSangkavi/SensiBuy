import mongoose from 'mongoose';

const { Schema } = mongoose;

const newItem = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
  },
  imageUrl: {
    type: String,
  },
});

const Item = mongoose.model('Item', newItem);
export default Item;
