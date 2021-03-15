const axios = require("axios");
const { getError } = require("./errors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
/**
 * Use google client info in the environment
 * to creaet nodemailer transporter
 */
async function getGoogleMailTransporter() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const user = process.env.GOOGLE_EMAIL_USER;

  const authClient = new OAuth2(
    clientId,
    clientSecret,
    "https://developers.google.com/oauthplayground"
  );

  authClient.setCredentials({
    refresh_token: refreshToken,
  });
  let accessToken, transporter;
  try {
    accessToken = await authClient.getAccessToken();
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user,
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      },
    });
  } catch (err) {
    throw await getError(err);
  }
  return transporter;
}

/**
 * Send activationLink to the user using gmail server
 * @param {String} name
 * @param {String} email
 * @param {String} activationLink
 */
async function sendActivationEmail(name, email, otp) {
  try {
    let transporter = await getGoogleMailTransporter();
    const mailBody = getEmailBody(process.env.EMAILUSER, email, name, otp);
    transporter.sendMail(mailBody);
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Send OTP to users email
 * @param {String} name
 * @param {String} email
 * @param {String} otp
 */
async function sendOTPEmail(name, email, otp) {
  console.log(name, email, otp);
  try {
    let transporter = await getGoogleMailTransporter();
    const mailBody = getEmailBodyOTP(process.env.EMAILUSER, email, name, otp);
    transporter.sendMail(mailBody);
  } catch (err) {
    throw await getError(err);
  }
}

function getEmailBodyOTP(senderEmail, receiverEmail, receiverName, otp) {
  let mailBody = {
    from: `"BlockByBlock" <${senderEmail}>`,
    to: receiverEmail,
    subject: "Your temporary password",
    text: `Hello ${receiverName}, we've generated the following temporary password for you. You may use it to log in to your account: ${otp}`,
    html: `<h2>Hello ${receiverName},</h2>
    <p>We've generated a temporary password for you. You may use to it login to your account. We'd recommend changing your password once you log in.
    </p>
    <p>OTP: </p>
    <u>${otp}</u>
    `,
  };
  return mailBody;
}

/**
 * Make an email body (for activation email) given sender and receiver info
 * @param {String} senderEmail
 * @param {String} receiverEmail
 * @param {String} receiverName
 * @param {String} activationLink
 */
function getEmailBody(senderEmail, receiverEmail, receiverName, otp) {
  let mailBody = {
    from: `"BlockByBlock" <${senderEmail}>`,
    to: receiverEmail,
    subject: "Congratulations on getting started with building new habits",
    text: `Hello ${receiverName}, welcome to BlockByBlock. Please use this OTP to log in to your account: ${otp}`,
    html: `<h2>Hello ${receiverName},</h2>
    <p>Welcome to BlockByBlock. 
    Please use this OTP to log into your account: <p>
    <u>${otp}</u>
    `,
  };
  return mailBody;
}

module.exports = { sendActivationEmail, sendOTPEmail };
