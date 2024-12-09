import prisma from '../prismaClient'
import express, {Request, Response} from 'express';

const router = express.Router();

router.post('/plums', async (req: Request, res: Response) : Promise<any> => {
  const {   userId,
            actionTemplateId,
            actionValue,
            triggerTemplateId,
            triggerValue
        } = req.body;

  try {
    const user = await prisma.user.findUnique({where: {userId: userId}});
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
