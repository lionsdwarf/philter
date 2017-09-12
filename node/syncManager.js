const {
  syncFilesToDisk
} = require('./diskSync')
const {
  uploadFileToDrive,
  createDriveDir,
} = require('./driveSync')

const syncFilesToDrive = (driveFiles, sourceDir, defaultDirId) => {
  for(let fileName of driveFiles) {
    uploadFileToDrive(sourceDir, fileName, defaultDirId)
  }
}

const syncFiles = (syncData, dirs) => {
  dirs.source && dirs.targets.length > 0 && syncFilesToDisk(syncData.filesToSync.disk, dirs.source)
  // dirs.source && syncFilesToDrive(syncData.filesToSync.drive, dirs.source, syncData.defaultDirId)
}

module.exports = {
  syncFiles: syncFiles,
  createDriveDir: createDriveDir
}