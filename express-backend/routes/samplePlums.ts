import prisma from '../prismaClient'
import express, {Request, Response} from 'express';
import authenticateToken from '../middlewares/isLoggedIn';

const router = express.Router();

/**
 * @swagger
 * /sampleplums:
 *   post:
 *     summary: Create a new SamplePlum
 *     tags: [SamplePlums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               actionTemplateName:
 *                 type: string
 *               actionTemplateProvider:
 *                 type: string
 *               actionValue:
 *                 type: object
 *               triggerTemplateName:
 *                 type: string
 *               triggerTemplateProvider:
 *                 type: string
 *               triggerValue:
 *                 type: object
 *     responses:
 *       200:
 *         description: SamplePlum created successfully
 *       400:
 *         description: Missing required fields or Plum already exists
 *       404:
 *         description: ActionTemplate or TriggerTemplate not found
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticateToken, async (req: Request, res: Response) : Promise<any> => {
    const {
        name,
        actionTemplateName,
        actionTemplateProvider,
        actionValue,
        triggerTemplateName,
        triggerTemplateProvider,
        triggerValue
    } = req.body;

    if (!name || !actionTemplateName || !actionTemplateProvider || !triggerTemplateName || !triggerTemplateProvider)
        return res.status(400).json({error: 'Missing required fields'});
    try {
        const isSamplePlum = await prisma.plum.findFirst({
            where: {
                name: name
            }
        });

        if (isSamplePlum)
            return res.status(400).json({error: 'Plum already exists'});

        const actionTemplate = await prisma.actionTemplate.findUnique({
            where: {
                name_provider: { name: actionTemplateName, provider: actionTemplateProvider },
            }
        });
        if (!actionTemplate)
            return res.status(404).json({error: 'ActionTemplate not found'});

        const triggerTemplate = await prisma.triggerTemplate.findUnique({
            where: {
                name_provider: { name: triggerTemplateName, provider: triggerTemplateProvider },
            }
        });
        if (!triggerTemplate)
            return res.status(404).json({error: 'TriggerTemplate not found'});

        await prisma.samplePlums.create({
            data: {
                name: name,
                triggerTemplateName: triggerTemplateName,
                triggerTemplateProvider: triggerTemplateProvider,
                triggerValue: triggerValue || triggerTemplate.valueTemplate,
                actionTemplateName: actionTemplateName,
                actionTemplateProvider: actionTemplateProvider,
                actionValue: actionValue || actionTemplate.valueTemplate,
            }
        });
        return res.status(200).json({message: 'SamplePlum created successfully'});
    } catch (error) {
        console.error('Error creating SamplePlum:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
});

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
