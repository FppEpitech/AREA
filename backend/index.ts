import express, { Request, Response } from 'express';
import axios from 'axios';
import { config } from 'dotenv';

config();
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const WEBHOOK_URL = `https://discord.com/api/webhooks/1313489256257159178/pGIzP-Y9fDx1unJDGlHfElSJZCnU0iAfYi6QfQIRAE_IvOILMkwRuI2P7GTzbMV-Kd7S`;

app.post('/send-discord-message', async (req: Request, res: Response) : Promise<any> => {
  const {content, username} = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Le champ "content" est requis.' });
  }

  try {
    await axios.post(WEBHOOK_URL, {
      content,
      username: username || 'Mon Bot',
    });

    return res.status(200).json({ message: 'Message envoyé avec succès !' });
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de l\'envoi du message.' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server : http://localhost:${process.env.PORT}`);
});
