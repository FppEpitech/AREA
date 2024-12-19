import prisma from '../prismaClient'
import express, {Request, Response} from 'express';
import authenticateToken from '../middlewares/isLoggedIn';
import CryptoJS from 'crypto-js';

const router = express.Router();

const SPOTIFY_REDIRECT_URI = `http://localhost:${process.env.PORT}/spotify/callback`;

/**
 * @swagger
 * /spotify/authentification:
 *   get:
 *     summary: Redirect to Spotify authentication
 *     tags: [Spotify]
 *     responses:
 *       302:
 *         description: Redirect to Spotify authentication URL
 */
 router.get('/authentification', authenticateToken, (req, res) => {
    const userId = (req as any).middlewareId;
    const state = JSON.stringify({userId});
    const scope = 'playlist-modify-public playlist-modify-private user-library-read user-library-modify user-follow-read user-follow-modify user-top-read';

    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;

    res.redirect(spotifyAuthUrl);
});


function encryptTokenSpotify(token: string): string {
  const secret = process.env.SPOTIFY_HASHING_SECRET

  if (!secret)
    throw new Error('SECRET environment variable is not defined');
  return CryptoJS.AES.encrypt(token, secret).toString();
}

/**
 * @swagger
 * /spotify/callback:
 *   get:
 *     summary: Spotify authentication callback
 *     tags: [Spotify]
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Authorization code from Spotify
 *     responses:
 *       200:
 *         description: Spotify authenticated successfully
 *       400:
 *         description: Code is missing or invalid
 *       500:
 *         description: Failed to authenticate with Spotify
 */
router.get('/callback', async (req, res) : Promise<any> => {
    const { code, state } = req.query;

    if (!code)
      return res.status(400).json({error: 'Code is missing'});
    let userId: number;
    try {
      const decodedState = JSON.parse(state as string);
      userId = decodedState.userId;
    } catch (error) {
      return res.status(400).json({ error: 'Invalid state parameter' });
    }

    try {
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code as string,
          redirect_uri: SPOTIFY_REDIRECT_URI,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error)
        return res.status(400).json({error: tokenData.error});

      const { access_token, refresh_token } = tokenData;

      const encryptedAccessToken = encryptTokenSpotify(access_token);

      const newToken = await prisma.token.create({
        data: {
          userId: userId,
          provider: 'spotify',
          tokenHashed: encryptedAccessToken,
          scope: 1,
          creationDate: new Date().toISOString(),
        },
      });

      res.status(200).json({message: 'Spotify authenticated successfully', token: newToken});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to authenticate with Spotify' });
    }
});

export default router;
