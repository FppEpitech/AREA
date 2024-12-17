const nodemailer = require('nodemailer');

// --- complex mail to do later, need to hash the password -> good handling

// async function sendMailComplex(value_json: string) {
//     try {
//         const fixedActionValue = value_json.replace(/(\w+): /g, '"$1":').replace(/'/g, '"');

//         const { destination, object, message, sendingMail, sendingPwd, sendingPort, sendingHost } = JSON.parse(fixedActionValue);
//         const plumpyDev = nodemailer.createTransport({
//             host: sendingHost,
//             port: sendingPort,
//             secure: false,
//             auth: {
//               user: sendingMail,
//               pass: sendingPwd
//             }
//           });
//           const mailOptions = {
//             from: sendingMail,
//             to: destination,
//             subject: object,
//             text: message
//           };
//           plumpyDev.sendMail(mailOptions, function(error : any, info : any) {
//                 if (error) {
//                     console.log('Error:', error);
//                 } else {
//                     console.log("Complex Email sent  to " + destination + " : " + info.response);
//                 }
//             });
//     } catch (error) {
//         console.error('Error sending message:', error);
//     }
// }

async function sendMailBasic(value_json: string) {
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

export default sendMailBasic;
