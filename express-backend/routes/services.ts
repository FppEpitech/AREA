import prisma from '../prismaClient'
import express, {Request, Response} from 'express';

const servicesRouter = express.Router();

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: A list of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No services found
 */
servicesRouter.get('/', async (req: Request, res: Response) => {
  const services = await prisma.service.findMany();
  if (!services) {
    res.status(404).json({ error: 'No services found' });
  }
  res.status(200).json(services);
});

export default servicesRouter;
