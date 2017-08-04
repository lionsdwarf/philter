const {
  copyToDisk
} = require('./diskSync')
const {
  uploadFileToDrive
} = require('./gDriveSync')
const {
  getDefaultFolderId
} = require('./gDriveFolderManager')

const filesToSync = {
  drive: new Set(),
  disk: new Set()
}

const handleSelection = (fileName, type, isSelected) => {
  isSelected ? filesToSync[type].add(fileName) : filesToSync[type].delete(fileName)
}

const syncFilesToDrive = getSourceDir => {
  for(let fileName of filesToSync.drive) {
    uploadFileToDrive(getSourceDir(), fileName, getDefaultFolderId())
  }
}

const syncFilesToDisk = (getSourceDir, getTargetDir) => {
  for(let fileName of filesToSync.disk) {
    copyToDisk(getSourceDir(), getTargetDir(), fileName)
  }
}

const syncFiles = () => {
  const {
    getSourceDir,
    getTargetDir,
  } = require('./navManager')
  syncFilesToDrive(getSourceDir, getTargetDir)
  syncFilesToDisk(getSourceDir)
}

module.exports = {
  handleSelection: handleSelection,
  syncFiles: syncFiles
}