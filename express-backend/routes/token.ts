import express, { Request, Response } from 'express';
import prisma from '../prismaClient'; // Ensure that your Prisma client is properly imported
import authenticateToken from '../middlewares/isLoggedIn'; // Middleware to verify the user's session or token

const router = express.Router();

/**
 * @swagger
 * /token:
 *  get:
 *   summary: Get all tokens
 *   tags: [Token]
 * responses:
 *  200:
 *      description: A list of tokens
 *      content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      type: object
 *  500:
 *      description: Internal server error
 */
router.get('/', authenticateToken, async (req: Request, res: Response) : Promise<any> => {
    const userId = (req as any).middlewareId;

    try {
        const tokens = await prisma.token.findMany({
            where: {
                userId: userId,
            },
            select: {
                provider: true,
                id: true,
            },
        });
        if (tokens)
            return res.status(200).json(tokens);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /token:
 *  post:
 *   summary: Create a token
 *   tags: [Token]
 *   requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                       provider:
 *                           type: string
 *                       value:
 *                           type: string
 *   responses:
 *       201:
 *           description: Token created successfully
 *       400:
 *           description: Bad request
 *       500:
 *           description: Internal server error
 */
router.delete('/:id', authenticateToken, async (req: Request, res: Response): Promise<any> => {
    const userId = (req as any).middlewareId;
    const { id } = req.params;

    try {
        const token = await prisma.token.findFirst({
            where: {
                id: Number(id),
                userId: userId,
            },
        });

        if (!token) {
            return res.status(404).json({ error: 'Token not found or does not belong to the user' });
        }

        await prisma.token.delete({
            where: {
                id: Number(id),
            },
        });

        return res.status(204).json({ message: 'Token deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
