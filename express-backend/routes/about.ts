import prisma from '../prismaClient';
import express, { Request, Response } from 'express';

const router = express.Router();
/**
 * @swagger
 * /about.json:
 *   get:
 *     summary: Get server and client information
 *     responses:
 *       200:
 *         description: Successfully fetched server and client information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client:
 *                   type: object
 *                   properties:
 *                     host:
 *                       type: string
 *                 server:
 *                   type: object
 *                   properties:
 *                     current_time:
 *                       type: integer
 *                     services:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           actions:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                 description:
 *                                   type: string
 *                           reactions:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                 description:
 *                                   type: string
 */
router.get('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const clientIp = req.ip;

        const currentTime = Math.floor(Date.now() / 1000);

        const services = [
            {
                name: "Discord",
                actions: [
                ],
                reactions: [
                    {
                        name: "Receive Discord Message",
                        description: "The user receive a message on his discord server"
                    }
                ]
            },
            {
                name: "OpenWeatherMap",
                actions: [
                    {
                        name: "Pressure",
                        description: "Pressure is less/equal/superior than pressure given"
                    },
                    {
                        name: "Temperature",
                        description: "Temperature is less/equal/superior than temperature given"
                    },
                    {
                        name: "Cloudiness",
                        description: "Cloudiness is less/equal/superior than cloudiness given"
                    },
                    {
                        name: "WindSpeed",
                        description: "WindSpeed is less/equal/superior than windSpeed given"
                    },
                    {
                        name: "Humidity",
                        description: "Humidity is less/equal/superior than humidity given"
                    },
                    {
                        name: "Weather",
                        description: "Weather is like than the temperature given"
                    }
                ],
                reactions: [
                ]
            },
            {
                name: "Mail",
                actions: [
                    {
                        name: "Receive mail",
                        description: "The user receive a mail"
                    }
                ],
                reactions: [
                    {
                        name: "Send basic mail",
                        description: "That send a basic mail"
                    },
                    {
                        name: "Send complex mail",
                        description: "That send a complex mail"
                    }
                ]
            },
            {
                name: "Spotify",
                actions: [
                    {
                        name: "Spotify new like",
                        description: "If the user like a new song on spotify"
                    },
                    {
                        name: "Spotify music playing",
                        description: "If the user listenning music on spotify"
                    },
                    {
                        name: "Spotify music pausing",
                        description: "If the user don't listenning music on spotify"
                    }
                ],
                reactions: [
                    {
                        name: "Skip to previous music",
                        description: "That skip the current music to the next one on spotify"
                    },
                    {
                        name: "Skip to next music",
                        description: "That skip the current music to the previous one on spotify"
                    },
                    {
                        name: "Resume the music",
                        description: "That resume the current music on spotify"
                    },
                    {
                        name: "Stop a Spotify playing music",
                        description: "That pause the current music on spotify"
                    }
                ]
            },
            {
                name: "Clock",
                actions: [
                    {
                        name: "World time",
                        description: "If time is equal to the time that given"
                    }
                ],
                reactions: [
                ]
            },
            {
                name: "Naolib",
                actions: [
                    {
                        name: "Tramway is close",
                        description: "If the tramway is close to the stop that given the user"
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
