import axios from 'axios';
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient'

export async function spotifyNewLike(userId: number, value_json: string, data: any): Promise<boolean>
{
    console.log("BEGINNING FUNC");
    const tokenSpotify = await prisma.token.findFirst({ where: { userId: userId } });

    if (!tokenSpotify)
        throw new Error("Token not found for the user.");

    console.log("BEFORE RESPONSE");
    const response = await fetch('https://api.spotify.com/v1/me/tracks?limit=1', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenSpotify?.tokenHashed}`,
        },
    });

    console.log("BEFORE RESULT");
    const result = await response.json();

    console.log("CHECK ITEM");
    if (!result.items || result.items.length === 0)
        throw new Error("No liked tracks found.");

    const track = result.items[0].track;
    const title = track.name;
    const artist = track.artists[0].name;
    console.log(`Titre: ${title}`);
    console.log(`Artiste: ${artist}`);


    if (!data || !data.title || !data.artist) {
        console.log("DATA IS EMPTY");
        data = { title, artist };
        return false;
    }

    if (data.title !== title || data.artist !== artist) {
        console.log("NEW LIKE");
        data = { title, artist };
        return true;
    }

    console.log("NO NEW LIKE");
    return false;
}
