import { describe, it, expect } from 'vitest';
import { generateToken} from '../routes/account';

describe('main test', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });
});

it('Should generate token', () => {
    let token = generateToken(1);
    expect(token).not.toBe(null);
});
