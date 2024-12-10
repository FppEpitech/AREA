import prisma from '../prismaClient'
import express, {Request, Response} from 'express';

const router = express.Router();

/**
 * @swagger
 * /trigger/templates:
 *   get:
 *     summary: Get all trigger templates
 *     tags: [Trigger]
 *     responses:
 *       200:
 *         description: A list of trigger templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to fetch trigger templates
 */
router.get('/templates', async (req: Request, res: Response) => {
    try {
        const templates = await prisma.triggerTemplate.findMany();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trigger templates.' });
    }
});

export default router;
