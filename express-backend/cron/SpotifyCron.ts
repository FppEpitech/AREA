import axios from 'axios';
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient'


export async function spotifyNewLike(userId: number, value_json: string) : Promise<boolean> {

    const tokenSpotify = await prisma.token.findFirst({where: {userId: userId}});
    const response = await fetch('https://api.spotify.com/v1/me/tracks', {
        headers: {
        Authorization: `Bearer ${tokenSpotify?.tokenHashed}`,
        },
    });
    if (!response.ok)
        throw new Error('Failed to fetch liked tracks');


    const data = await response.json();
    const likedSongs = data.items.map((item: any) => ({
        title: item.track.name,
        artist: item.track.artists.map((artist: any) => artist.name).join(', '),
    }));

    const isNewLike = !likedSongs.some((song: { title: string; artist: string }) =>
        song.title.toLowerCase() === songLiked.title.toLowerCase() &&
        song.artist.toLowerCase() === songLiked.artist.toLowerCase()
    );

    if (isNewLike) {
        console.log(`New liked song: ${songLiked.title} by ${songLiked.artist}`);
        return true;
    }
    return false;
}
