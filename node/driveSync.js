const fs = require('fs')
const path = require('path')
const {
  ACCESS_TYPE,
  SCOPE,
  REDIRECT_URI
} = require('./constants/gDrive')

let drive
let eventEmitter

const createDir = (event, dirName) => {
  drive.files.create({
    resource: {
      name: dirName,
      mimeType: 'application/vnd.google-apps.folder'
    },
    fields: 'id'
  }, (err, folder) => {
    !err && fetchDriveDirs()
  })
}

const fetchDriveDirs = () => {
  drive.files.list({
    q: 'mimeType="application/vnd.google-apps.folder"'
  }, (err, folderData) => {
    eventEmitter.send('drive-dirs', folderData.files)
  })
}

const uploadFileToDrive = (sourceDirPath, fileName, parentFolderId) => {
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

const init = (driveConn, ee) => {
  drive = driveConn
  eventEmitter = ee
  fetchDriveDirs()
}

module.exports = {
  uploadFileToDrive: uploadFileToDrive,
  createDriveDir: createDir,
  init: init,
}
