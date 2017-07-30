const fs = require('fs')
const path = require('path')
const {
  ipcRenderer
} = require('electron')
const google = require('googleapis')
const OAuth2 = google.auth.OAuth2
const {
  ACCESS_TYPE,
  SCOPE,
  REDIRECT_URI
} = require('./constants/gDrive')

let drive

ipcRenderer.on('gDrive-Data', (event, gDrive) => {
  establishConnection(gDrive)
})

const establishConnection = gDrive => {
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

const createFolder = (sourceDirPath, fileName) => {
  drive.files.create({
    resource: {
      name: 'User Input',
      mimeType: 'application/vnd.google-apps.folder'
    },
    fields: 'id'
  }, (err, folder) => {
    !err && uploadFile(sourceDirPath, fileName)
  })
}

const uploadFile = (sourceDirPath, fileName, parentFolderId) => {
  const sourceFile = path.join(sourceDirPath, fileName)
  drive.files.create({
    resource: {
      name: fileName,
      parents: parentFolderId ? [ parentFolderId ] : []
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
  uploadFileToDrive: uploadFile,
  createDriveFolder: createFolder
}
