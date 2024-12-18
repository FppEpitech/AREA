import prisma from '../prismaClient'
import CryptoJS from 'crypto-js';


function decryptToken(encryptedToken: string): string {
    const secret = process.env.SPOTIFY_SECRET

    if (!secret)
        throw new Error('SECRET environment variable is not defined');
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export async function spotifyNewLike(userId: number, value_json: string, data: any): Promise<boolean>
{
    const tokenSpotify = await prisma.token.findFirst({ where: { userId: userId } });

    if (!tokenSpotify)
        throw new Error("Token not found for the user.");

    const decryptedToken = decryptToken(tokenSpotify.tokenHashed);

    const response = await fetch('https://api.spotify.com/v1/me/tracks?limit=1', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${decryptedToken}`,
        },
    });

    const result = await response.json();

    if (!result.items || result.items.length === 0)
        throw new Error("No liked tracks found.");

    const track = result.items[0].track;
    const title = track.name;
    const artist = track.artists[0].name;

    if (!data || !data.title || !data.artist) {
        if (!data)
            data = {};
        data.title = title;
        data.artist = artist;
        return false;
    }

    if (data.title !== title || data.artist !== artist) {
        console.log("NEW LIKE");
        data.title = title;
        data.artist = artist;
        return true;
    }
    console.log("NO NEW LIKE");
    return false;
}
