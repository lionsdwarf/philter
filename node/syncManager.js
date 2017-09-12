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

const syncByTargetType = (filesObj, sourceDir, targetType) => {
  for(let fileName in filesObj) {
    for (let targetDir of filesObj[fileName]) {
      syncUtil[targetType](sourceDir, targetDir, fileName)
    }
  }
}

const syncFiles = (syncData, dirs) => {
  for (let targetType in syncData.filesToSync) {
    syncByTargetType(syncData.filesToSync[targetType], dirs.source, targetType)
  }
}

module.exports = {
  syncFiles: syncFiles,
  createDriveDir: createDriveDir
}