const fs = require('fs')
const path = require('path')
const {
  ipcRenderer
} = require('electron')
const {
  ACCESS_TYPE,
  SCOPE,
  REDIRECT_URI
} = require('./constants/gDrive')
const {
  populateDefaultFolderPicklist,
} = require('./gDriveFolderManager')

let drive

const createFolder = () => {
// const createFolder = (sourceDirPath, fileName) => {
  drive.files.create({
    resource: {
      name: 'Ooozer Yinput',
      mimeType: 'application/vnd.google-apps.folder'
    },
    fields: 'id'
  }, (err, folder) => {
    // !err && uploadFile(sourceDirPath, fileName, folder.id)
    !err && console.log('fid', folder.id)
  })
}

const fetchDriveFolders = (drive) => {
  drive = drive
  drive.files.list({
    q: 'mimeType="application/vnd.google-apps.folder"'
  }, (err, folderData) => {
    populateDefaultFolderPicklist(folderData.files)
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
  createDriveFolder: createFolder,
  generateDriveFolderSelect: fetchDriveFolders,
}
