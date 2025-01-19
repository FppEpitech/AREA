import prisma from '../prismaClient'
import express, {Request, Response} from 'express';
import authenticateToken from '../middlewares/isLoggedIn';

const router = express.Router();

/**
 * @swagger
 * /sampleplums:
 *   get:
 *     summary: Get all SamplePlums
 *     tags: [SamplePlums]
 *     responses:
 *       200:
 *         description: A list of SamplePlums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateToken, async (req: Request, res: Response) : Promise<any> => {
    try {
        const samplePlums = await prisma.samplePlums.findMany();

        return res.status(200).json({samplePlums: samplePlums});
    } catch (error) {
        console.error('Error getting SamplePlums:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
});

export default router;
