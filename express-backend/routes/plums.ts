import prisma from '../prismaClient'
import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken'
import authenticateToken from '../middlewares/isLoggedIn';

const router = express.Router();

router.post('/', authenticateToken, async (req: Request, res: Response) : Promise<any> => {
  const {   token,
            actionTemplateId,
            actionValue,
            triggerTemplateId,
            triggerValue
        } = req.body;

  try {
    const userId = (req as any).middlewareId;
    if (!userId)
      return res.status(401).json({error: 'Invalid or expired token'});

    const user = await prisma.user.findUnique({where: {userId}});
    if (!user)
      return res.status(404).json({error: 'User not found'});

    const actionTemplate = await prisma.actionTemplate.findUnique({where: {id: actionTemplateId}});
    if (!actionTemplate)
      return res.status(404).json({error: 'ActionTemplate not found'});

    const triggerTemplate = await prisma.triggerTemplate.findUnique({where: {id: triggerTemplateId}});
    if (!triggerTemplate)
      return res.status(404).json({error: 'TriggerTemplate not found'});


    const action = await prisma.action.create({
      data: {
        actionTemplateId,
        actionValue: actionValue || actionTemplate.valueTemplate,
        userId,
      },
    });

    const trigger = await prisma.trigger.create({
      data: {
        triggerTemplateId,
        triggerValue: triggerValue || triggerTemplate.valueTemplate,
        userId,
      },
    });

    const plum = await prisma.plum.create({
      data: {
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

router.delete('/:plumId', async (req: Request, res: Response) : Promise<any> => {
    const { plumId } = req.params;

    try {
        const plum = await prisma.plum.findUnique({where: {id: parseInt(plumId)}});
        if (!plum)
          return res.status(404).json({error: 'Plum not found'});

        await prisma.plum.delete({where: {id: parseInt(plumId)}});
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting Plum:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
