import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import complaintsRoutes from './routes/complaints.js';
import departmentsRoutes from './routes/departments.js';
import adminRoutes from "./routes/admin.js";

const app = express();

// Connect to Database
connectDB();

// Middleware
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  'http://localhost',
  'http://localhost:80',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1'
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintsRoutes);
app.use('/api/departments', departmentsRoutes);
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
