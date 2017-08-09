const fs = require('fs')
const path = require('path')
// const {
//   ipcRenderer
// } = require('electron')
const {
  ACCESS_TYPE,
  SCOPE,
  REDIRECT_URI
} = require('./constants/gDrive')
// const {
//   populateDefaultFolderPicklist,
// } = require('./gDriveFolderManager')

let drive

const createFolder = () => {
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

const fetchDriveFolders = () => {
  drive.files.list({
    q: 'mimeType="application/vnd.google-apps.folder"'
  }, (err, folderData) => {
    // populateDefaultFolderPicklist(folderData.files)
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

const initDriveSync = driveConn => {
  drive = driveConn
  fetchDriveFolders()
}

module.exports = {
  uploadFileToDrive: uploadFileToDrive,
  createDriveFolder: createFolder,
  initDriveSync: initDriveSync,
}
