import prisma from '../prismaClient'
import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken'
import authenticateToken from '../middlewares/isLoggedIn';

const router = express.Router();

/**
 * @swagger
 * /plums:
 *   post:
 *     summary: Create a new plum
 *     tags: [Plums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               actionTemplateId:
 *                 type: number
 *               actionValue:
 *                 type: string
 *               triggerTemplateId:
 *                 type: number
 *               triggerValue:
 *                 type: string
 *     responses:
 *       201:
 *         description: Plum created successfully
 *       401:
 *         description: Invalid or expired token
 *       404:
 *         description: User, ActionTemplate, or TriggerTemplate not found
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticateToken, async (req: Request, res: Response) : Promise<any> => {
  const {   name,
            actionTemplateName,
            actionTemplateProvider,
            actionValue,
            triggerTemplateName,
            triggerTemplateProvider,
            triggerValue
        } = req.body;

  try {
    const userId = (req as any).middlewareId;

    const user = await prisma.user.findUnique({where: {userId}});
    if (!user)
      return res.status(404).json({error: 'User not found'});

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


    const action = await prisma.action.create({
      data: {
        actionTemplateId: actionTemplate.id,
        actionValue: actionValue || actionTemplate.valueTemplate,
        userId,
      },
    });

    const trigger = await prisma.trigger.create({
      data: {
        triggerTemplateId: triggerTemplate.id,
        triggerValue: triggerValue || triggerTemplate.valueTemplate,
        userId,
      },
    });

    const plum = await prisma.plum.create({
      data: {
        name: name,
        userId,
        actionId: action.id,
        triggerId: trigger.id,
      },
      include: {
        user: true,
        action: {
          include: {actionTemplate: true},
        },
        trigger: {
          include: {triggerTemplate: true},
        },
      },
    });

    res.status(201).json(plum);
  } catch (error) {
    console.error('Error creating Plum:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /plums:
 *   get:
 *     summary: Get all plums for the authenticated user
 *     tags: [Plums]
 *     responses:
 *       200:
 *         description: A list of plums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateToken,  async (req : Request, res : Response) : Promise<any> => {
    const userId = (req as any).middlewareId;
    const plums = await prisma.plum.findMany({
        where: { userId },
        include: {
            action: {
                include: { actionTemplate: true }
            },
            trigger: {
                include: { triggerTemplate: true }
            }
        }
    }).catch((err : any) => {
        console.log(err);
        res.status(500).json({error: 'Internal server error' });
        return null;
    });
    if (plums)
      res.status(200).json(plums);
})

/**
 * @swagger
 * /plums/{plumId}:
 *   delete:
 *     summary: Delete a plum by ID
 *     tags: [Plums]
 *     parameters:
 *       - in: path
 *         name: plumId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the plum to delete
 *     responses:
 *       204:
 *         description: Plum deleted successfully
 *       404:
 *         description: Plum not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:plumId', authenticateToken, async (req: Request, res: Response) : Promise<any> => {
    const { plumId } = req.params;

    try {
        const plum = await prisma.plum.findUnique({where: {id: parseInt(plumId), userId: (req as any).middlewareId}});
        if (!plum)
          return res.status(404).json({error: 'Plum not found'});

        await prisma.plum.delete({where: {id: parseInt(plumId)}});
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting Plum:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:plumId', authenticateToken, async (req: Request, res: Response) : Promise<any> => {
    let id = req.params.plumId;
    const {
        name,
        actionTemplateId,
        actionValue,
        triggerTemplateId,
        triggerValue,
    } = req.body;

    console.log(req.body);

    try {
        let query = prisma.plum.update({
            where: { id: parseInt(id) },
            data: {
                name: name,
                action: {
                    update: {
                        actionValue : actionValue,
                        actionTemplateId: actionTemplateId,
                    }
                },
                trigger: {
                    update: {
                        triggerValue : triggerValue,
                        triggerTemplateId: triggerTemplateId,
                    }
                }
            }
        });
        res.status(200).json(await query);
    } catch (e) {
        console.log("Error while updating plum", e);
    }
});

export default router;
