import User from '../models/User.model.js';
import {bcrypt, saltRounds } from '../configs/bcrypt.js';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, userEmail, password, userType, imageUrl } = req.body;

    // Hash the password with the specified number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ firstName, lastName, userEmail, password: hashedPassword, userType, imageUrl });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, userEmail, password, imageUrl } = req.body;
  
    try {
      // Find the user by _id and update it
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: { firstName, lastName, userEmail, password, imageUrl } },
        { new: true } // Return the updated document
      );
  
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.deleteOne({ _id: id });
      if (deletedUser.deletedCount === 1) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const loginUser = async (req, res) => {
    try {
      const { userEmail, password } = req.body;
  
      console.log('Received userEmail:', userEmail);
  
      const user = await User.findOne({ userEmail });
  
      console.log('User found:', user);
      
      if (!user) {
        console.log('Invalid email');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log('Password mismatch');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ email: user.userEmail, name: user.firstName }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      console.log(token);
      res.json({ token, user });
    } catch (error) {
      console.error('Error logging in:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const invalidatedTokens = new Set();

export const logoutUser = async (req, res) => {
  try {
    const { token } = req.body;

    // Add the token to the invalidated tokens list
    invalidatedTokens.add(token);

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out backend:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const isTokenValid = (token) => {
  // Check if the token is in the invalidatedTokens set
  return !invalidatedTokens.has(token);
};
  
  
  
  
  