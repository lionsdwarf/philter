const {
  copyToDisk
} = require('./diskSync')
const {
  uploadFile
} = require('./gDriveSync')
// // gDriveUtil.createDriveFolder(sourceDirPath, fileName)

const filesToSync = {
  drive: new Set(),
  disk: new Set()
}

const handleSelection = (fileName, type, isSelected) => {
  isSelected ? filesToSync[type].add(fileName) : filesToSync[type].delete(fileName)
}

const syncFilesToDrive = () => {

}

const syncFilesToDisk = () => {
  const {
    sourceDir,
    targetDir,
  } = require('./navManager')
  for(let fileName of filesToSync.disk) {
    console.log(sourceDir(), targetDir())
    copyToDisk(sourceDir(), targetDir(), fileName)
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