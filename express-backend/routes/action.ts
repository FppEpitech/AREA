import prisma from '../prismaClient'
import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/templates', async (req: Request, res: Response) : Promise<any> => {
    try {
        const templates = await prisma.actionTemplate.findMany();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch action templates.' });
    }
});

export default router;
