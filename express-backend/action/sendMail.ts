const nodemailer = require('nodemailer');
import CryptoJS from 'crypto-js';

function decryptTokenMail(encryptedToken: string): string {
    const secret = process.env.PLUMS_HASHING_SECRET

    if (!secret)
        throw new Error('SECRET environment variable is not defined');
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
}

async function sendMailComplex(userId: number, value_json: string) {
    try {
        const { destination, object, message, sendingMail, sendingPwd, sendingPort, sendingHost } = JSON.parse(value_json);
        const plumpyDev = nodemailer.createTransport({
            host: sendingHost,
            port: sendingPort,
            secure: false,
            auth: {
              user: sendingMail,
              pass: decryptTokenMail(sendingPwd)
            }
          });
          const mailOptions = {
            from: sendingMail,
            to: destination,
            subject: object,
            text: message
          };
          plumpyDev.sendMail(mailOptions, function(error : any, info : any) {
                if (error) {
                    console.log('Error:', error);
                } else {
                    console.log("Complex Email sent  to " + destination + " : " + info.response);
                }
            });
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

async function sendMailBasic(userId: number, value_json: string) {
    try {
        const { destination, object, message } = JSON.parse(value_json);
        const plumpyDev = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
          const mailOptions = {
            from: process.env.EMAIL_ADRESS,
            to: destination,
            subject: object,
            text: message
          };
          plumpyDev.sendMail(mailOptions, function(error : any, info : any) {
                if (error) {
                    console.log('Error:', error);
                } else {
                    console.log("Email sent  to " + destination + " : " + info.response);
                }
            });
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

export {
    sendMailComplex,
    sendMailBasic
};
