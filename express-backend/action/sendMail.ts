const nodemailer = require('nodemailer');
import CryptoJS from 'crypto-js';

function decryptTokenMail(encryptedToken: string): string {
    console.log(encryptedToken);
    const secret = process.env.PLUMS_CRYPTING_SECRET

    if (!secret)
        throw new Error('SECRET environment variable is not defined');
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
}

async function sendMailComplex(userId: number, value_json: any) {
    value_json = JSON.parse(value_json);
    try {
        const plumpyDev = nodemailer.createTransport({
            host: value_json.sendingHost.value,
            port: value_json.sendingPort.value,
            secure: false,
            auth: {
              user: value_json.sendingMail.value,
              pass: decryptTokenMail(value_json.sendingPwd.value)
            }
          });
          const mailOptions = {
            from: value_json.sendingMail.value,
            to: value_json.destination.value,
            subject: value_json.object.value,
            text: value_json.message.value
          };
          plumpyDev.sendMail(mailOptions, function(error : any, info : any) {
                if (error) {
                    console.log('Error:', error);
                } else {
                    console.log("Complex Email sent  to " + value_json.destination.value + " : " + info.response);
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
            to: destination.value,
            subject: object.value,
            text: message.value
          };
          plumpyDev.sendMail(mailOptions, function(error : any, info : any) {
                if (error) {
                    console.log('Error:', error);
                } else {
                    console.log("Email sent  to " + destination.value + " : " + info.response);
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
