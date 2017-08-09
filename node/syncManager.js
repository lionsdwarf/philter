const {
  copyFileToDisk
} = require('./diskSync')
const {
  uploadFileToDrive
} = require('./driveSync')
// const {
//   getDefaultFolderId
// } = require('./driveFolderManager')

const syncFilesToDrive = (driveFiles, sourceDir) => {
  for(let fileName of driveFiles) {
    uploadFileToDrive(sourceDir, fileName)
    // uploadFileToDrive(sourceDir, fileName, getDefaultFolderId())
  }
}

const syncFilesToDisk = (diskFiles, sourceDir, targetDir) => {
  for(let fileName of diskFiles) {
    copyFileToDisk(sourceDir, targetDir, fileName)
  }
}

const syncFiles = (filesToSync, dirs) => {
  dirs.source && syncFilesToDrive(filesToSync.drive, dirs.source)
  dirs.source && dirs.target && syncFilesToDisk(filesToSync.disk, dirs.source, dirs.target)
}

module.exports = {
  sync: syncFiles
}