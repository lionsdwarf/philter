const electronOauth2 = require('electron-oauth2')
const keytar = require('keytar')
const gDriveApp = require(process.argv[2]).googleDrive
const {
  AUTHORIZATION_URL,
  TOKEN_URL,
  REDIRECT_URI,
  ACCESS_TYPE,
  SCOPE
} = require('./constants/gDrive')

const config = {
    clientId: gDriveApp.clientId,
    clientSecret: gDriveApp.clientSecret,
    authorizationUrl: AUTHORIZATION_URL,
    tokenUrl: TOKEN_URL,
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
  const tokens = await refreshAccessToken() || await initLogin()
  eventEmitter.send('gDrive-Data', {
    tokens: tokens,
    app: gDriveApp
  })
}

//use refresh token to obtain access token
async function refreshAccessToken() {
  const refreshToken = await keytar.getPassword('Philter', 'GoogleDriveRefreshToken')
  if (!refreshToken) {
    return null
  }
  const tokenData = await electronOauth2(config, windowParams).refreshToken(refreshToken)
  return {
    refreshToken: refreshToken,
    accessToken: tokenData.access_token
  }
}

//initiate google login flow
async function initLogin() {
  const tokens = await electronOauth2(config, windowParams).getAccessToken(options)
  if (tokens.refresh_token) {
    persistRefreshToken(tokens.refresh_token)    
  }
  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token
  }
}

const persistRefreshToken = (refreshToken) => {
  keytar.setPassword('Philter', 'GoogleDriveRefreshToken', refreshToken)
}

module.exports = getAccessToken
