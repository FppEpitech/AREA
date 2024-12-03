import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient'
import { User } from '@prisma/client';
import { Router, Request, Response } from 'express'

const accountRouter = Router();

const generateToken = (userId: number) => {
    const expiresIn = 24 * 60 * 60;
    return jwt.sign({ id: userId }, process.env.SECRET as string, { expiresIn });
};

const createNewUser = async (username : string, mail : string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        throw new Error("Failed hashing your password");
    }
    const employee = await prisma.user.create({
        data: {
            username: username,
            mail: mail,
            hashedPassword: hashedPassword,
        },
    });
    if (!employee)
        throw new Error("Failed creating new user in new db.");
    return employee
};

accountRouter.post('/register', async (req: any, res: any) => {
    const { username, mail, password } = req.body;

    if (!username || !mail || !password)
        return res.status(400).json({ msg: "Bad parameters" });
    try {
        let user : User | null = await prisma.user.findUnique({
            where: { mail: mail },
        });
        if (user)
            return res.status(409).json({ msg: "User exists." });
        user = await createNewUser(username, mail, password);
        const token = generateToken(user.userId);
        return res.status(201).json({ token: token });
    } catch (error) {
        return res.status(500).json({ msg: `Internal Server Error ${error}`});
    }
});

accountRouter.post('/login', async (req: any, res: any) => {
    const { mail, password } = req.body;

    if (!mail || !password)
        return res.status(400).json({ msg: "Bad parameters" });
    try {
        let user : User | null = await prisma.user.findUnique({
            where: { mail: mail },
        });
        if (!user) {
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

export default accountRouter
