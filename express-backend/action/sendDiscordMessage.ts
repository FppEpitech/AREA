import axios from 'axios';

async function sendDiscordMessage(value_json: string) {
    try {
        const fixedActionValue = value_json.replace(/(\w+): /g, '"$1":').replace(/'/g, '"');
        const { webhookUrl, content } = JSON.parse(fixedActionValue);
        await axios.post(webhookUrl, {
            content: content,
            username: 'Plumpy',
        });
        console.log('Message successfully sent');
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

export default sendDiscordMessage;
