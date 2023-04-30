//const sgMail = require('@sendgrid/mail');
const nodemailer = require("nodemailer");
require('dotenv').config();

//const { SENDGRID_API_KEY } = process.env;

//sgMail.setApiKey(SENDGRID_API_KEY);
const { META_PASSWORD, EMAIL_FROM } = process.env;
const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_FROM,
      pass: META_PASSWORD,
    },
  };

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
    const email = { ...data, EMAIL_FROM };
    await transport.sendMail(email);
    return true;
};

module.exports = sendEmail;