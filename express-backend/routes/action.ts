import prisma from '../prismaClient'
import express, {Request, Response} from 'express';

const router = express.Router();

/**
 * @swagger
 * /actions/templates:
 *   get:
 *     summary: Get all action templates
 *     tags: [Actions]
 *     responses:
 *       200:
 *         description: A list of action templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to fetch action templates
 */
router.get('/templates', async (req: Request, res: Response) : Promise<any> => {
    try {
        const templates = await prisma.actionTemplate.findMany();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch action templates.' });
    }
});

router.get('/templates/:provider', async (req: Request, res: Response) : Promise<any> => {
    const { provider } = req.params;
    if (!provider) {
        res.status(400).json({ error: 'Provider is required.' });
        return;
    }
    try {
        const templates = await prisma.actionTemplate.findMany({
            where: {
                provider: provider
            }
        });
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch action templates.' });
    }
});

export default router;
