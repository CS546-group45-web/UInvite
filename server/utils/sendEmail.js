const nodemailer = require('nodemailer');
const handelbars = require('handlebars');
const fs = require('fs');
const path = require('path');

const sendEmail = (email, subject, message, url, headline, buttonText) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const source = fs
    .readFileSync(
      path.join(__dirname, '../emails/welcome-template.html'),
      'utf8'
    )
    .toString();
  const template = handelbars.compile(source);
  const replacements = {
    url: url,
    message: message,
    buttonText: buttonText,
    headline: headline,
  };
  const htmlToSend = template(replacements);

  let mailOptions = {
    from: '"UInvite" <' + process.env.EMAIL + '>',
    to: email,
    subject: subject,
    html: htmlToSend,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log('Message sent: %s', info.messageId);
  });
};

module.exports = sendEmail;
