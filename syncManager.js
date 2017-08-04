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

const syncFilesToDrive = () => {
  const {
    getSourceDir,
  } = require('./navManager')
  for(let fileName of filesToSync.drive) {
    uploadFileToDrive(getSourceDir(), fileName, getDefaultFolderId())
  }
}

const syncFilesToDisk = () => {
  const {
    getSourceDir,
    getTargetDir,
  } = require('./navManager')
  for(let fileName of filesToSync.disk) {
    copyToDisk(getSourceDir(), getTargetDir(), fileName)
  }
}

const syncFiles = () => {
  syncFilesToDrive()
  syncFilesToDisk()
}

module.exports = {
  handleSelection: handleSelection,
  syncFiles: syncFiles
}