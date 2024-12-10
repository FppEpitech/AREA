import { describe, it, expect } from 'vitest';
import { generateToken} from '../routes/account';
import request from 'supertest';
import app from '../index';

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
