import prisma from '../prismaClient';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const clientIp = req.ip;

        const currentTime = Math.floor(Date.now() / 1000);

        const services = [
            {
                name: "discord",
                actions: [
                ],
                reactions: [
                    {
                        name: "receive_discord_message",
                        description: "The user receive a message"
                    }
                ]
            },
            {
                name: "weather",
                actions: [
                    {
                        name: "less_than",
                        description: "Temperature is less than temperature given"
                    },
                    {
                        name: "greater_than",
                        description: "Temperature is greater than temperature given"
                    },
                    {
                        name: "is_equal",
                        description: "Temperature is equal at temperature given"
                    }
                ],
                reactions: [
                ]
            }
        ];

        res.json({
            client: {
                host: clientIp
            },
            server: {
                current_time: currentTime,
                services: services
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send about.json.' });
    }
});

export default router;
