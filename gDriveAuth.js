const electronOauth2 = require('electron-oauth2')
const gDriveCreds = require(process.argv[2]).googleDrive

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'
const SCOPE = [
  'https://www.googleapis.com/auth/drive.file'
]

const config = {
    clientId: gDriveCreds.clientId,
    clientSecret: gDriveCreds.clientSecret,
    authorizationUrl: GOOGLE_AUTHORIZATION_URL,
    tokenUrl: GOOGLE_TOKEN_URL,
    useBasicAuthorizationHeader: false,
    redirectUri: 'http://localhost'
}

const windowParams = {
  autoHideMenuBar: true,
  webPreferences: {
      nodeIntegration: false
  }
}

const options = {
  scope: SCOPE,
  accessType: 'offline'
};

const initLogin = () => {
  const myApiOauth = electronOauth2(config, windowParams);
  myApiOauth.getAccessToken(options)
    .then(token => {
      console.log('access_token', token)
      // use your token.access_token 

      myApiOauth.refreshToken(token.refresh_token)
        .then(newToken => {
          console.log('refresh_token', newToken)
          //use your new token 
        });
    });
}

// const refreshToken = () => null

// module.exports = refreshToken || initLogin
module.exports = initLogin
