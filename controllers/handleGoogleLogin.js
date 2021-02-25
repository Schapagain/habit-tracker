require('dotenv').config();
const { google } = require('googleapis');

/*******************/
/** CONFIGURATION **/
/*******************/

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: "http://localhost:3000", // this must match your google api settings
};

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
function urlGoogle() {
  try {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
  }catch(err) {
    console.log(err);
  }
}

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  });
}


function getGooglePlusApi(auth) {
  return google.plus({ version: 'v1', auth });
}

/**
 * Extract the email and id of the google account from the "code" parameter.
 */
async function getGoogleUser(code) {
  
  // get the auth "tokens" from the request
  const data = await auth.getToken(code);
  const tokens = data.tokens;
  
  // add the tokens to the google api so we have access to the account
  const auth = createConnection();
  auth.setCredentials(tokens);
  
  // connect to google plus - need this to get the user's email
  const plus = getGooglePlusApi(auth);
  const me = await plus.people.get({ userId: 'me' });
  
  // get the google id and email
  const userGoogleId = me.data.id;
  const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

  // return so we can login or sign up the user
  return {
    id: userGoogleId,
    email: userGoogleEmail,
    tokens: tokens, // you can save these to the user if you ever want to get their details without making them log in again
  };
}


module.exports = { urlGoogle, getGoogleUser }