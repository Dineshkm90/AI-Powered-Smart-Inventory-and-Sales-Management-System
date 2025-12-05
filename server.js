import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import billsRouter from './routes/billsRoutes.js';
import customerRouter from './routes/customersRoutes.js';
import productRouter from './routes/productsRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

// ✅ Connect with MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('MongoDB Error:', err.message));

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// ✅ Default Route — to stop “GET / 404” message
app.get('/', (req, res) => {
  res.send('🚀 Smart Inventory Management API is running successfully!');
});

// ✅ API Routes
app.use('/api/products/', productRouter);
app.use('/api/users/', userRouter);
app.use('/api/bills/', billsRouter);
app.use('/api/customers/', customerRouter);

// ✅ Port
const PORT = process.env.PORT || 8081;

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
