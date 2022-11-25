const nodemailer = require('nodemailer');
const handelbars = require('handlebars');
const fs = require('fs');
const path = require('path');

const sendEmail = (email, subject, text, name, url) => {
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
    name: name,
    url: url,
  };
  const htmlToSend = template(replacements);

  let mailOptions = {
    from: '"UInvite" <' + process.env.EMAIL + '>',
    to: email,
    subject: subject,
    text: text,
    html: htmlToSend,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

module.exports = sendEmail;
