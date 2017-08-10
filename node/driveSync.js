const fs = require('fs')
const path = require('path')
const {
  ACCESS_TYPE,
  SCOPE,
  REDIRECT_URI
} = require('./constants/gDrive')

let drive
let eventEmitter

const createDir = () => {
  drive.files.create({
    resource: {
      name: 'Ooozer Yinput',
      mimeType: 'application/vnd.google-apps.folder'
    },
    fields: 'id'
  }, (err, folder) => {
    !err && console.log('fid', folder.id)
  })
}

const fetchDriveDirs = () => {
  console.log('df', drive)
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
  init: init,
}
