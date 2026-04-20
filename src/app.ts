import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import { setupSwagger } from './swagger';


dotenv.config();

const app = express();

setupSwagger(app);
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;