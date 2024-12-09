import prisma from '../prismaClient'
import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken'

const router = express.Router();

const getUserIdFromToken = (token: string): number | null => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET as string) as { id: number };
    return decoded.id;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};

router.post('/', async (req: Request, res: Response) : Promise<any> => {
  const {   token,
            actionTemplateId,
            actionValue,
            triggerTemplateId,
            triggerValue
        } = req.body;

  try {
    const userId = getUserIdFromToken(token);
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
      },
    });

    const trigger = await prisma.trigger.create({
      data: {
        triggerTemplateId,
        triggerValue: triggerValue || triggerTemplate.valueTemplate,
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

export default router;
