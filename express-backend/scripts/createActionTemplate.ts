import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createActionTemplate_SendDiscordMessage() {
  try {
    const actionTemplate = await prisma.actionTemplate.create({
      data: {
        name: 'Send Discord Message',
        actFunc: 'sendDiscordMessage',
        provider: 'Discord',
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

async function createActionTemplate_sendMailBasic() {
    try {
      const actionTemplate = await prisma.actionTemplate.create({
        data: {
          name: 'Send Basic Mail',
          actFunc: 'sendMailBasic',
          provider: 'mail',
          valueTemplate: {
            destination : {
                type : 'mail',
                template : 'theophilejeromerocher44@gmail.com'
            },
            object : {
                type : 'string',
                template : 'Hello world !'
            },
            message : {
                type : 'string',
                template : 'Hello everybody, this is a test message from PlumpyDev !'
            }
          },
        },
      });
      console.log('ActionTemplate \'Send Mail Basic\' created:', actionTemplate);

    } catch (error) {
      console.error('Erreur lors de la création du ActionTemplate:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async function createActionTemplate_sendMailComplex() {
    try {
      const actionTemplate = await prisma.actionTemplate.create({
        data: {
          name: 'Send Complex Mail',
          actFunc: 'sendMailComplex',
          provider: 'mail',
          valueTemplate: {
            destination : {
                type : 'mail',
                template : 'theophilejeromerocher44@gmail.com'
            },
            object : {
                type : 'string',
                template : 'Hello world !'
            },
            message : {
                type : 'string',
                template : 'Hello everybody, this is a test message from PlumpyDev !'
            },
            sendingMail : {
                type : 'mail',
                template : 'anyone@gmail.com'
            },
            sendingPwd : {
                type : 'password',
                template : 'kikivalgrind42'
            },
            sendingPort : {
                type : 'number',
                template : 587
            },
            sendingHost : {
                type : 'string',
                template : 'smtp.gmail.com'
            }
        },
      }
    });
      console.log('ActionTemplate \'Send Mail Complex\' created:', actionTemplate);

    } catch (error) {
      console.error('Erreur lors de la création du ActionTemplate:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

createActionTemplate_SendDiscordMessage();
createActionTemplate_sendMailBasic();
createActionTemplate_sendMailComplex();
