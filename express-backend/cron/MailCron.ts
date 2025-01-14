import CryptoJS from 'crypto-js';
var Imap = require('imap');
var inspect = require('util').inspect;
const { simpleParser } = require('mailparser');

function decryptPlumCryptedContent(encryptedToken: string): string {
    const secret = process.env.PLUMS_CRYPTING_SECRET

    if (!secret)
        throw new Error('SECRET environment variable is not defined');
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export async function isMailReceived(userId: number, value_json: any, data: any): Promise<boolean>
{
    value_json = JSON.parse(value_json);
    const decryptedPassword = decryptPlumCryptedContent(value_json.password?.value);
    return new Promise((resolve, reject) => {
        var imap = new Imap({
            user: value_json.user?.value,
            password: decryptedPassword,
            host: value_json.host?.value,
            port: value_json.port?.value,
            secure: true,
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
        });

        imap.once('ready', () => {
            imap.openBox('INBOX', false, (err : any, box : any) => {
            if (err) throw err;

            const sinceDate = new Date(Date.now() - 60 * 60 * 1000);
            const searchCriteria = [
                'UNSEEN',
                ['SINCE', sinceDate.toISOString()],
            ];

            imap.search(searchCriteria, (err : any, results : any) => {
                if (err) throw err;

                if (!results || results.length == 0) {
                    imap.end();
                    resolve(false);
                    return;
                }
                resolve(true);
            });
            });
        });

        imap.once('error', (err : any) => {
            console.error('Connection error:', err);
            resolve(false);
        });

        imap.once('end', () => {
            resolve(false);
        });

        imap.connect();
    });
}

export default isMailReceived;
