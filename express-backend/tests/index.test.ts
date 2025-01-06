import { describe, it, expect, vi, beforeAll } from 'vitest';
import { generateToken } from '../routes/account';
import request from 'supertest';
import app from '../index';
import prisma from '../prismaClient';

describe('main test', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });
});

it('Should generate token', () => {
    let token = generateToken(1);
    expect(token).not.toBe(null);
});

it("Should return 200", async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
});

/*describe('GET /triggers/templates', () => {
    it('Should return 200 and a list of trigger templates', async () => {
        const response = await request(app).get('/trigger/templates');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('POST /account/register', () => {
    it('Should register a new user and return 201 with a token', async () => {
        const originalFindUnique = prisma.user.findUnique;
        prisma.user.findUnique = vi.fn().mockResolvedValue(null);

        const response = await request(app)
            .post('/account/register')
            .send({ mail: 'tests@tests.testsss', password: 'tests' });
        expect(response.status).toBe(201);
        expect(response.body.token).not.toBe(null);

        prisma.user.findUnique = originalFindUnique;
        prisma.user.delete = vi.fn().mockResolvedValue(null);
    });

    it('Should return 400 if mail or password is missing', async () => {
        const response = await request(app)
            .post('/account/register')
            .send({ mail: 'test@example.com' });
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Bad parameters');
    });

    it('Should return 409 if user already exists', async () => {
        const originalFindUnique = prisma.user.findUnique;
        prisma.user.findUnique = vi.fn().mockResolvedValue({ mail: 'test@tester.com' });

        const response = await request(app)
            .post('/account/register')
            .send({ mail: 'test@tester.com', password: 'tester' });
        expect(response.status).toBe(409);
        expect(response.body.msg).toBe('User exists.');

        prisma.user.findUnique = originalFindUnique;
    });
});

describe('POST /account/login', () => {
    it('Should login a user and return 200 with a token', async () => {
        const originalFindUnique = prisma.user.findUnique;

        const response = await request(app)
            .post('/account/login')
            .send({ mail: "mama@gmail.com", password: "ok" });
        expect(response.status).toBe(200);
        expect(response.body.token).not.toBe(null);

        prisma.user.findUnique = originalFindUnique;
    });

    it('Should return 400 if mail or password is missing', async () => {
        const response = await request(app)
            .post('/account/login')
            .send({ mail: 'test@example.com' });
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Bad parameters');
    });

    it('Should return 409 if credentials are invalid', async () => {
        const originalFindUnique = prisma.user.findUnique;
        prisma.user.findUnique = vi.fn().mockResolvedValue(null);

        const response = await request(app)
            .post('/account/login')
            .send({ mail: 'test@example.com', password: 'password123' });
        expect(response.status).toBe(409);
        expect(response.body.msg).toBe('Invalid Credentials');

        prisma.user.findUnique = originalFindUnique;
    });
});*/
