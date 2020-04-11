var config = require('../config');
var sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(config.sendgridKey);

exports.send = async (to, subject, body) => {
        sendgrid.send({
            to: to,
            from: 'thiago_viana99@hotmail.com',
            subject: subject,
            html: body
        });
   
}