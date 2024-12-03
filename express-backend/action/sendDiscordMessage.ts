import axios from 'axios';

async function sendDiscordMessage(valueTemplate: {webhookUrl: string; content: string}) {
    try {
      await axios.post(valueTemplate.webhookUrl, {
        content: valueTemplate.content,
        username: 'Plumpy',
      });
      console.log('Message envoyé avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
}

export default sendDiscordMessage;
