import prisma from '../prismaClient';

async function sendDiscordMessageTemplate() {
  try {
    const actionTemplate = await prisma.actionTemplate.create({
      data: {
        name: 'Send Discord Message',
        actFunc: 'sendDiscordMessage',
        provider: 'Discord',
        valueTemplate: {
          webhookUrl: {
            value: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL',
            type: 'string',
          },
          content: {
            value: 'Hello, World!',
            type: 'string',
          }
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

export { sendDiscordMessageTemplate };
