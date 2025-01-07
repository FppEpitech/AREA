import axios from 'axios';

async function sendDiscordMessage(userId: number, value_json: string) {
    try {
        const { webhookUrl, content } = JSON.parse(value_json);
        await axios.post(webhookUrl?.value, {
            content: content?.value,
            username: 'Plumpy',
        });
    } catch (error) {
    }
}

export default sendDiscordMessage;
