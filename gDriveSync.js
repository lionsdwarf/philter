const fs = require('fs')
const path = require('path')
const {
  ipcRenderer
} = require('electron')
const google = require('googleapis')
const OAuth2 = google.auth.OAuth2
const {
  // AUTHORIZATION_URL,
  // TOKEN_URL,
  ACCESS_TYPE,
  SCOPE,
  REDIRECT_URI
} = require('./constants/gDrive')

let drive

ipcRenderer.on('gDrive-Data', (event, gDrive) => {
  establishDriveConnection(gDrive)
})

const establishDriveConnection = gDrive => {
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
}

const uploadToDrive = (sourceDirPath, fileName) => {
  const sourceFile = path.join(sourceDirPath, fileName)
  drive.files.create({
    resource: {
      name: fileName,
      mimeType: 'image/jpeg'
    },
    media: {
      mimeType: 'image/jpeg',
      body: fs.createReadStream(sourceFile)
    }
  }, (err, result) => {
    console.log('err', err)
    console.log('result', result)
  })
}

module.exports = {
  uploadToDrive: uploadToDrive
}
