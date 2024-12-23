import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function lessThanTriggerTemplate() {
  try {
    const triggerLessTemplate = await prisma.triggerTemplate.create({
      data: {
        name: 'Less than temperature',
        provider: 'OpenWeatherMap',
        type: 'cron',
        trigFunc: 'lessThan',
        valueTemplate: {
          time: '* * * * *',
          temperature: 0,
          city: 'Nantes',
          country: 'FR',
        },
      },
    });
    console.log('TriggerTemplate \'Less than temperature\' created:', triggerLessTemplate);

  } catch (error) {
    console.error('Erreur lors de la création du ActionTemplate:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function greaterThanTriggerTemplate() {
    try {
        const triggerGreaterTemplate = await prisma.triggerTemplate.create({
        data: {
            name: 'Greater than temperature',
            provider: 'OpenWeatherMap',
            type: 'cron',
            trigFunc: 'greaterThan',
            valueTemplate: {
                time: '* * * * *',
                temperature: 0,
                city: 'Nantes',
                country: 'FR',
            },
        },
        });
        console.log('TriggerTemplate \'Greater than temperature\' created:', triggerGreaterTemplate);

    } catch (error) {
        console.error('Erreur lors de la création du ActionTemplate:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function isEqualTriggerTemplate() {
    try {
        const triggerEqualTemplate = await prisma.triggerTemplate.create({
        data: {
            name: 'Equal temperature',
            provider: 'OpenWeatherMap',
            type: 'cron',
            trigFunc: 'isEqual',
            valueTemplate: {
                time: '* * * * *',
                temperature: 0,
                city: 'Nantes',
                country: 'FR',
            },
        },
        });
        console.log('TriggerTemplate \'Equal temperature\' created:', triggerEqualTemplate);

    } catch (error) {
        console.error('Erreur lors de la création du ActionTemplate:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function isSpotifyNewLikeTriggerTemplate() {
  try {
      const triggerEqualTemplate = await prisma.triggerTemplate.create({
      data: {
          name: 'Spotify new like',
          provider: 'Spotify',
          type: 'cron',
          trigFunc: 'spotifyNewLike',
          valueTemplate: {
            time: '* * * * *',
          },
      },
      });
      console.log('TriggerTemplate \'Spotify new like\' created:', triggerEqualTemplate);

  } catch (error) {
      console.error('Erreur lors de la création du ActionTemplate:', error);
  } finally {
      await prisma.$disconnect();
  }
}

async function isMailReceivedTriggerTemplate() {
  try {
      const triggerEqualTemplate = await prisma.triggerTemplate.create({
      data: {
          name: 'Mail received',
          provider: 'mail',
          type: 'cron',
          trigFunc: 'mailReceived',
          valueTemplate: {
            time: {
                template: '* * * * *',
                type: 'cron',
            },
            port: {
                type: 'number',
                template: 993,
            },
            host: {
                type: 'string',
                template: 'imap.gmail.com',
            },
            user : {
                type : 'string',
                template : 'user',
            },
            password : {
                type : 'string',
                back_hash: true,
                template : 'password',
            },
        }
      }});
        console.log('TriggerTemplate \'Mail received\' created:', triggerEqualTemplate);
  } catch (error) {
        console.error('Erreur lors de la création du ActionTemplate:', error);
  }
}

lessThanTriggerTemplate()
greaterThanTriggerTemplate()
isEqualTriggerTemplate()
isSpotifyNewLikeTriggerTemplate();
isMailReceivedTriggerTemplate();
