import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createActionTemplate() {
  try {
    const actionTemplate = await prisma.actionTemplate.create({
      data: {
        name: 'Send Discord Message',
        actFunc: 'sendDiscordMessage',
        provider: 'Discord',
        valueTemplate: {
          webhookUrl: {
            type: "string",
            min_len: "5",
            max_len: "200",
            check: "url",
            template: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL'
        },
          content: {
            type: "string",
            min_len: "1",
            max_len: "2000",
            template: 'Hello, world!'
          },
          username: {
            type: "string",
            min_len: "1",
            max_len: "80",
            template: 'BotTest'
          },
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
