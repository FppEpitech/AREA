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
    console.error('Error during creation of ActionTemplate:', error);
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
                type : 'string',
                check: 'mail',
                value : 'theophilejeromerocher44@gmail.com'
            },
            object : {
                type : 'string',
                value : 'Hello world !'
            },
            message : {
                type : 'string',
                value : 'Hello everybody, this is a test message from PlumpyDev !'
            }
          },
        },
      });
      console.log('ActionTemplate \'Send Mail Basic\' created:', actionTemplate);

    } catch (error) {
      console.error('Erreur lors de la création du ActionTemplate');
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
                type : 'string',
                check: 'mail',
                value : 'theophilejeromerocher44@gmail.com'
            },
            object : {
                type : 'string',
                value : 'Hello world !'
            },
            message : {
                type : 'string',
                value : 'Hello everybody, this is a test message from PlumpyDev !'
            },
            sendingMail : {
                type : 'string',
                check: 'mail',
                value : 'anyone@gmail.com'
            },
            sendingPwd : {
                back_hash: true,
                type : 'string',
                check: 'password',
                value : 'kikivalgrind42'
            },
            sendingPort : {
                type : 'number',
                value : 587
            },
            sendingHost : {
                type : 'string',
                value : 'smtp.gmail.com'
            }
        },
      }
    });
      console.log('ActionTemplate \'Send Mail Complex\' created:', actionTemplate);

    } catch (error) {
      console.error('Erreur lors de la création du ActionTemplate');
    } finally {
      await prisma.$disconnect();
    }
  }

async function stopPlayingSpotifyMusicTemplate() {
  try {
    const actionTemplate = await prisma.actionTemplate.create({
      data: {
        name: 'Stop a Spotify playing music',
        actFunc: 'stopPlayingSpotifyMusic',
        provider: 'Spotify',
        valueTemplate: {
        },
      },
    });
    console.log('ActionTemplate \'Stop a Spotify playing music\' created:', actionTemplate);

  } catch (error) {
    console.error('Error during creation of ActionTemplate:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function resumePlayingSpotifyMusicTemplate() {
  try {
    const actionTemplate = await prisma.actionTemplate.create({
      data: {
        name: 'Resume the music',
        actFunc: 'resumePlayingSpotifyMusic',
        provider: 'Spotify',
        valueTemplate: {
        },
      },
    });
    console.log('ActionTemplate \'Play a Spotify playing music\' created:', actionTemplate);

  } catch (error) {
    console.error('Error during creation of ActionTemplate:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function skipNextSpotifyMusicTemplate() {
  try {
    const actionTemplate = await prisma.actionTemplate.create({
      data: {
        name: 'Skip to next music',
        actFunc: 'skipToNextTrackSpotify',
        provider: 'Spotify',
        valueTemplate: {
        },
      },
    });
    console.log('ActionTemplate \'Skip Spotify playing music\' created:', actionTemplate);

  } catch (error) {
    console.error('Error during creation of ActionTemplate:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function skipPreviousSpotifyMusicTemplate() {
  try {
    const actionTemplate = await prisma.actionTemplate.create({
      data: {
        name: 'Skip to previous music',
        actFunc: 'previousPlayingSpotifyMusic',
        provider: 'Spotify',
        valueTemplate: {
        },
      },
    });
    console.log('ActionTemplate \'Skip Previous Spotify playing music\' created:', actionTemplate);

  } catch (error) {
    console.error('Error during creation of ActionTemplate:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export { sendMailBasicTemplate, sendMailComplexTemplate, sendDiscordMessageTemplate, skipPreviousSpotifyMusicTemplate, skipNextSpotifyMusicTemplate, resumePlayingSpotifyMusicTemplate, stopPlayingSpotifyMusicTemplate};
