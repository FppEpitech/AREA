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
          provider: 'Mail',
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
    //   console.error('Error creating action template, normal ? already exists ?');
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
          provider: 'Mail',
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
    //   console.error('Error creating action template, normal ? already exists ?');
    } finally {
      await prisma.$disconnect();
    }
  }

async function stopPlayingSpotifyMusicTemplate() {
    console.log("YES ALLING THE FUNCTION");
  try {
    const actionTemplate = await prisma.actionTemplate.create({
      data: {
        name: 'Stop a Spotify playing music',
        actFunc: 'stopPlayingSpotifyMusic',
        provider: 'Spotify',
        valueTemplate: {
          signup: {
            value: "/spotify/authentification",
            type: "signup",
          }
        },
      },
    });
    console.log('ActionTemplate \'Stop a Spotify playing music\' created:', actionTemplate);

  } catch (error) {
    console.log('Error during creation of ActionTemplatejfkdlmq:', error);
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
          signup: {
            value: "/spotify/authentification",
            type: "signup",
          }
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
          signup: {
            value: "/spotify/authentification",
            type: "signup",
          }
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
          signup: {
            value: "/spotify/authentification",
            type: "signup",
          }
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
