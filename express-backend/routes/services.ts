import prisma from '../prismaClient'
import express, {Request, Response} from 'express';

const servicesRouter = express.Router();

servicesRouter.get('/', async (req: Request, res: Response) => {
  const services = await prisma.service.findMany();
  if (!services) {
    res.status(404).json({ error: 'No services found' });
  }
  res.status(200).json(services);
});

export default servicesRouter;
