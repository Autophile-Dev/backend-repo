import express, { Application, Request, Response, NextFunction } from 'express';
import userRoutes from '../routes/userRoutes';
import ApiError from '../entities/ApiError';

const app = express();
const PORT = 3030;
app.use(express.json());
app.use('/api', userRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});