import mongoose from 'mongoose';

const { Schema } = mongoose;

const newUser = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

const User = mongoose.model('User', newUser);

export default User;
