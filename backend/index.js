import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDatabase from './configs/database.js';
import itemRoutes from './routes/item.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log('Server Started');
  connectDatabase();
});

app.get('/', (req, res) => {
  res.json('Server Started');
});
