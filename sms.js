require('dotenv').config();
// const fast2sms = require('fast-two-sms');

// function sendSMS(mobile, message) {
//     let options = {
//         authorization : process.env.API_KEY ,
//         method : 'POST', 
//         message : message, 
//         route : 't', 
//         numbers : [mobile]
//     } 

//     fast2sms.sendMessage(options)
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.log(error);
//     });
// }
// module.exports = {
//     sendSMS,
// }

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendSMS(mobile, message) {
    client.messages
        .create({
            body: message,
            from: '+14146260628',
            to: '+91'+mobile
        })
  .then(response => console.log(response));
}

module.exports = {
    sendSMS,
}