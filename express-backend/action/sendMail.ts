const nodemailer = require('nodemailer');

function decryptTokenMail(encryptedToken: string): string {
    const secret = process.env.PLUMS_HASHING_SECRET

    if (!secret)
        throw new Error('SECRET environment variable is not defined');
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
}

async function sendMailComplex(userId: number, value_json: string) {
    try {
        const fixedActionValue = value_json.replace(/(\w+): /g, '"$1":').replace(/'/g, '"');

        const { destination, object, message, sendingMail, sendingPwd, sendingPort, sendingHost } = JSON.parse(fixedActionValue);
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
        const fixedActionValue = value_json.replace(/(\w+): /g, '"$1":').replace(/'/g, '"');
        const { destination, object, message } = JSON.parse(fixedActionValue);
        const plumpyDev = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PWD
            }
          });
          const mailOptions = {
            from: 'plumpydev@gmail.com',
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
