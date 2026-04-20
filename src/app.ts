import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;