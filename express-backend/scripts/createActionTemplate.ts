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

export { sendDiscordMessageTemplate, skipPreviousSpotifyMusicTemplate, skipNextSpotifyMusicTemplate, resumePlayingSpotifyMusicTemplate, stopPlayingSpotifyMusicTemplate};
