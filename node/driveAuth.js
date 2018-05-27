const electronOauth2 = require('electron-oauth2')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const keytar = require('keytar')
const {
  AUTHORIZATION_URL,
  TOKEN_URL,
  REDIRECT_URI,
  ACCESS_TYPE,
  SCOPE
} = require('./constants/gDrive')
const driveSync = require('./driveSync')

let driveApp, config, drive

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

const configureDriveApp = (configPath, eventEmitter) => {
  driveApp = require(configPath).googleDrive
  config = {
    clientId: driveApp.clientId,
    clientSecret: driveApp.clientSecret,
    authorizationUrl: AUTHORIZATION_URL,
    tokenUrl: TOKEN_URL,
    useBasicAuthorizationHeader: false,
    redirectUri: REDIRECT_URI
  }
}

const establishConnection = (gDrive, eventEmitter) => {
  const oauth2Client = new OAuth2(
    gDrive.app.clientId,
    gDrive.app.clientSecret,
    REDIRECT_URI
  )

  oauth2Client.setCredentials({
    access_token: gDrive.tokens.accessToken,
    refresh_token: gDrive.tokens.refreshToken
  })

  oauth2Client.generateAuthUrl({
    access_type: ACCESS_TYPE,
    scope: SCOPE,
  })

  drive = google.drive({
    version: 'v3',
    auth: oauth2Client
  })
  driveSync.init(drive, eventEmitter)
}

async function getAccessToken(configPath, eventEmitter) {
  configureDriveApp(configPath)
  const tokens = await refreshAccessToken() || await initLogin()
  const drive = establishConnection({
    tokens: tokens,
    app: driveApp
  }, eventEmitter)
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

module.exports = {
  init: getAccessToken,
}
