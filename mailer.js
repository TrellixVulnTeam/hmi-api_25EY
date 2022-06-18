require('dotenv').config();
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    // host: 'smtp.mailtrap.io',
    host : 'smtp-relay.sendinblue.com',
    port : 587,
    // port: 2525,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
 });
 
function sendEmail(email, subject, text) {
    let mailOptions = {
        from: 'hmiapp@iv4.com', 
        to: email, 
        subject: subject, 
        text: text, 
    };
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = {sendEmail};