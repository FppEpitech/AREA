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
          time: '* * * * * *',
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
                time: '* * * * * *',
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
                time: '* * * * * *',
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

lessThanTriggerTemplate()
greaterThanTriggerTemplate()
isEqualTriggerTemplate()}
