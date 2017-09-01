const {
  copyFileToDisk
} = require('./diskSync')
const {
  uploadFileToDrive,
  createDriveDir,
} = require('./driveSync')
// const {
//   getDefaultFolderId
// } = require('./driveFolderManager')

const syncFilesToDrive = (driveFiles, sourceDir, defaultDirId) => {
  for(let fileName of driveFiles) {
    uploadFileToDrive(sourceDir, fileName, defaultDirId)
  }
}

const syncFilesToDisk = (diskFiles, sourceDir, targetDir) => {
  for(let fileName of diskFiles) {
    copyFileToDisk(sourceDir, targetDir, fileName)
  }
}

const syncFiles = (syncData, dirs) => {
  dirs.source && syncFilesToDrive(syncData.filesToSync.drive, dirs.source, syncData.defaultDirId)
  dirs.source && dirs.target && syncFilesToDisk(syncData.filesToSync.disk, dirs.source, dirs.target)
}

module.exports = {
  syncFiles: syncFiles,
  createDriveDir: createDriveDir
}