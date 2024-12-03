import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createActionTemplate() {
  try {
    const actionTemplate = await prisma.actionTemplate.create({
      data: {
        name: 'Send Discord Message',
        actFunc: 'sendDiscordMessage',
        valueTemplate: {
          webhookUrl: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL',
          content: 'Test message',
          username: 'BotTest',
        },
      },
    });
    console.log('ActionTemplate \'Send Discord Message\' created:', actionTemplate);

  } catch (error) {
    console.error('Erreur lors de la création du ActionTemplate:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createActionTemplate();
