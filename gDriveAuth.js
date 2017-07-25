const electronOauth2 = require('electron-oauth2')
const keytar = require('keytar')
const gDriveCreds = require(process.argv[2]).googleDrive

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'
const REDIRECT_URI = 'http://localhost'
const ACCESS_TYPE = 'offline'
const SCOPE = [
  'https://www.googleapis.com/auth/drive.file'
]

const config = {
    clientId: gDriveCreds.clientId,
    clientSecret: gDriveCreds.clientSecret,
    authorizationUrl: GOOGLE_AUTHORIZATION_URL,
    tokenUrl: GOOGLE_TOKEN_URL,
    useBasicAuthorizationHeader: false,
    redirectUri: REDIRECT_URI
}

const windowParams = {
  autoHideMenuBar: true,
  webPreferences: {
      nodeIntegration: false
  }
}

const options = {
  scope: SCOPE,
  accessType: ACCESS_TYPE
};

async function getAccessToken(eventEmitter) {
  const accessToken = await refreshAccessToken() || await initLogin()
  eventEmitter.send('gDrive-access-token', accessToken)
}

//use refresh token to obtain access token
async function refreshAccessToken() {
  const refreshToken = await keytar.getPassword('Philter', 'GoogleDriveRefreshToken')
  if (!refreshToken) {
    return null
  }
  return await electronOauth2(config, windowParams).refreshToken(refreshToken).access_token
}

//initiate google login flow
async function initLogin() {
  const tokens = await electronOauth2(config, windowParams).getAccessToken(options)
  if (tokens.refresh_token) {
    persistRefreshToken(tokens.refresh_token)    
  }
  return tokens.access_token
}

const persistRefreshToken = (refreshToken) => {
  keytar.setPassword('Philter', 'GoogleDriveRefreshToken', refreshToken)
}

module.exports = getAccessToken
