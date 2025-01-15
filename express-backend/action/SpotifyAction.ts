import axios from 'axios';
import prisma from '../prismaClient'
import decryptToken from '../cron/SpotifyCron'

export async function stopPlayingSpotifyMusic(userId: number, value_json: string) {
    try {
        console.log('Enter in stopPlayingSpotifyMusic');
        const tokenSpotify = await prisma.token.findFirst({ where: { userId: userId } });

        if (!tokenSpotify) {
            throw new Error("Token not found for the user.");
        }

        const decryptedToken = decryptToken(tokenSpotify.tokenHashed);

        const response = await axios({
            method: 'put',
            url: 'https://api.spotify.com/v1/me/player/pause',
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });
        console.log("Music playback stopped successfully.");
    } catch (error: any) {
        console.error('Error stopping Spotify music:', error.message || error);
    }
}

export async function resumePlayingSpotifyMusic(userId: number) {
    try {
        console.log('Enter in resumePlayingSpotifyMusic');

        const tokenSpotify = await prisma.token.findFirst({ where: { userId: userId } });

        if (!tokenSpotify) {
            throw new Error("Token not found for the user.");
        }

        const decryptedToken = decryptToken(tokenSpotify.tokenHashed);

        const response = await axios({
            method: 'put',
            url: 'https://api.spotify.com/v1/me/player/play',
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });
    } catch (error: any) {
        console.error('Error resuming Spotify music:', error.message || error);
    }
}

export async function skipToNextTrackSpotify(userId: number) {
    try {
        console.log('Enter in skipToNextTrackSpotify');

        const tokenSpotify = await prisma.token.findFirst({ where: { userId: userId } });

        if (!tokenSpotify) {
            throw new Error("Token not found for the user.");
        }

        const decryptedToken = decryptToken(tokenSpotify.tokenHashed);

        const response = await axios({
            method: 'post',
            url: 'https://api.spotify.com/v1/me/player/next',
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    } catch (error: any) {
        console.error('Error skipping to next track on Spotify:', error.message || error);
    }
}

export async function previousPlayingSpotifyMusic(userId: number) {
    try {
        console.log('Enter in previousPlayingSpotifyMusic');

        const tokenSpotify = await prisma.token.findFirst({ where: { userId: userId } });

        if (!tokenSpotify) {
            throw new Error("Token not found for the user.");
        }

        const decryptedToken = decryptToken(tokenSpotify.tokenHashed);

        const response = await axios({
            method: 'post',
            url: 'https://api.spotify.com/v1/me/player/previous',
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

        console.log("Successfully moved to the previous track.");
    } catch (error: any) {
        console.error('Error going to previous Spotify track:', error.message || error);
    }
}

