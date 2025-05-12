import express from 'express';
import cors from 'cors';
import blogRoutes from './routes/blogs/blogs.routes'
import authRoutes from "./routes/auth/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', authRoutes)
app.use('/blogs', blogRoutes);

export default app;