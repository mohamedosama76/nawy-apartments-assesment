import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import apartmentRoutes from './routes/apartments';

const prisma = new PrismaClient();
const app: express.Application = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/apartments', apartmentRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});


const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
