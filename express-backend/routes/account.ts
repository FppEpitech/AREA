import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient'
import { User } from '@prisma/client';
import express, { Router, Response, Request } from 'express';
import authenticateToken from '../middlewares/isLoggedIn';
import admin from "firebase-admin";
import path from "path";

const serviceAccountPath = path.resolve("fbCredentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const accountRouter = Router();

const generateToken = (userId: number) => {
    const expiresIn = 24 * 60 * 60;
    return jwt.sign({ id: userId }, process.env.SECRET as string, { expiresIn });
};

const createNewUser = async (mail : string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        throw new Error("Failed hashing your password");
    }
    const employee = await prisma.user.create({
        data: {
            mail: mail,
            hashedPassword: hashedPassword,
        },
    });
    if (!employee)
        throw new Error("Failed creating new user in new db.");
    return employee
};

/**
 * @swagger
 * /account/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad parameters
 *       409:
 *         description: User exists
 *       500:
 *         description: Internal Server Error
 */
accountRouter.post('/register', async (req: Request, res: Response): Promise<any> => {
    const { mail, password } = req.body;

    if (!mail || !password)
        return res.status(400).json({ msg: "Bad parameters" });
    try {
        let user : User | null = await prisma.user.findUnique({
            where: { mail: mail },
        });
        if (user && !user.externalProvider)
            return res.status(500).json({ msg: `Internal Server Error`});
        if (user && user.externalProvider) {
            user = await createNewUser(mail, password);
            const token = generateToken(user.userId);
            return res.status(201).json({ token: token });
        } else {
            let editedUser = await prisma.user.update({
                where: { mail: mail },
                data: {
                    hashedPassword: await bcrypt.hash(password, 10),
                },
            });
            let token = generateToken(editedUser.userId);
            return res.status(201).json({ token: token});
        }
    } catch (error) {
        return res.status(500).json({ msg: `Internal Server Error`});
    }
});

/**
 * @swagger
 * /account/login:
 *   post:
 *     summary: Login a user
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad parameters
 *       409:
 *         description: Invalid Credentials
 *       500:
 *         description: Internal Server Error
 */
accountRouter.post('/login', async (req: Request, res: Response) : Promise<any> => {
    const { mail, password } = req.body;

    if (!mail || !password)
        return res.status(400).json({ msg: "Bad parameters" });
    try {
        let user : User | null = await prisma.user.findUnique({
            where: { mail: mail },
        });
        if (!user || user.externalProvider) {
            return res.status(409).json({ msg: "Invalid Credentials" });
        }
        const isValidPassword = await bcrypt.compare(password, user?.hashedPassword);
        if (await !isValidPassword)
            return res.status(409).json({ msg: "Invalid Credentials" });
        const token = generateToken(user.userId);
        return res.status(200).json({ token: token });
    } catch (error) {
        return res.status(500).json({ msg: `Internal Server Error ${error}`});
    }
});

/**
 * @swagger
 * /account/deleteSelf:
 *   delete:
 *     summary: Delete the authenticated user's account.
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: password
 *         schema:
 *           type: string
 *           description: The user's password for confirmation
 *         required: true
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad parameters
 *       409:
 *         description: User not found or invalid credentials
 *       500:
 *         description: Internal server error
 */
accountRouter.delete('/deleteSelf', authenticateToken, async (req: Request, res: Response) : Promise<any> => {
    const userId = (req as any).middlewareId;
    const password = req.body.password;

    if (!password)
        return res.status(400).json({ msg: "Bad parameters" });

    try {
        const user = await prisma.user.findUnique({ where : { userId: userId }});

        if (!user)
            return res.status(409).json({ msg: "User not found" });

        const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

        if (!isValidPassword)
            return res.status(409).json({ msg: "Invalid Credentials" });

        await prisma.user.delete({
            where: { userId: userId },
        });
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: `Internal Server Error ${error}`});
    }
});
accountRouter.post('/loginGoogle', async (req: Request, res: Response): Promise<any> => {
    const { idToken } = req.body;
    if (!idToken) {
        return res.status(400).json({ msg: "Bad parameters: Missing idToken" });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken.token);
        const uid = decodedToken.uid;
        const fbUser = await admin.auth().getUser(uid);

        if (!fbUser || !fbUser.displayName || !fbUser.email) {
            return res.status(409).json({ msg: "Invalid Credentials" });
        }
        const user = await prisma.user.findUnique({where : { mail: fbUser.email }});
        if (!user) {
            let newUser = await prisma.user.create({
                data: {
                    mail: fbUser.email,
                    externalProvider: true,
                    hashedPassword: "",
            }});
            if (!newUser)
                return res.status(500).json({ msg: `Internal Server Error` });
            return res.status(200).json({ token: generateToken(newUser.userId) });
        } else {
            const token = generateToken(user.userId);
            return res.status(200).json({ token: token });
        }
    } catch (e) {
        return res.status(500).json({ msg: `Internal Server Error: ${e}` });
    }
});


export { generateToken };
export default accountRouter
