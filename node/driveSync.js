const fs = require('fs')
const path = require('path')
const {
  ACCESS_TYPE,
  SCOPE,
  REDIRECT_URI
} = require('./constants/gDrive')

let drive
let eventEmitter

const FOLDER_TYPE = 'application/vnd.google-apps.folder'
const TRASHED_FOLDER_EXCLUSION = 'trashed=false'
const FOLDER_QUERY = 'mimeType="' + FOLDER_TYPE +  '"' + ' and ' + TRASHED_FOLDER_EXCLUSION

const createDir = (event, dirName) => {
  drive.files.create({
    resource: {
      name: dirName,
      mimeType: FOLDER_TYPE
    },
    fields: 'id'
  }, (err, folder) => {
    !err && fetchDriveDirs()
  })
}

const fetchDriveDirs = () => {
  drive.files.list({
    q: FOLDER_QUERY
  }, (err, folderData) => {
    folderData.files && eventEmitter.send('drive-dirs', folderData.files)
  })
}

const uploadFileToDrive = (sourceDir, targetDir, fileName) => {
  const sourceFile = path.join(sourceDir, fileName)
  drive.files.create({
    resource: {
      name: fileName,
      parents: [ targetDir.id ]
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
