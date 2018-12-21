const {
  copyFileToDisk
} = require('./diskSync')
const {
  createDriveDir,
  uploadFileToDrive,
} = require('./driveSync')

const syncUtil = {
  disk: copyFileToDisk,
  drive: uploadFileToDrive,
}

const syncByTargetType = (filesObj, sourceDir, targetType, eventEmitter) => {
  for(let fileName in filesObj) {
    for (let targetDir of filesObj[fileName]) {
      syncUtil[targetType](sourceDir, targetDir, fileName, eventEmitter)
    }
  }
}

const syncFiles = (syncData, dirs, eventEmitter) => {
  for (let targetType in syncData.filesToSync) {
    syncByTargetType(syncData.filesToSync[targetType], dirs.source, targetType, eventEmitter)
  }
}

module.exports = {
  syncFiles: syncFiles,
  createDriveDir: createDriveDir
}