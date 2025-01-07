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

async function sendMailBasicTemplate() {
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

  async function sendMailComplexTemplate() {
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
                back_hash: true,
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

export { sendDiscordMessageTemplate, sendMailBasicTemplate, sendMailComplexTemplate };
