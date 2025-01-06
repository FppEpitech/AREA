import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function sendDiscordMessageTemplate() {
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
        name: 'Play a Spotify playing music',
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
        name: 'Skip to next Spotify playing music',
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
        name: 'Skip to previous Spotify playing music',
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

skipPreviousSpotifyMusicTemplate();
skipNextSpotifyMusicTemplate();
resumePlayingSpotifyMusicTemplate();
stopPlayingSpotifyMusicTemplate();
sendDiscordMessageTemplate();
