// const {
//   copyToDesktop
// } = require('./localSync')
// const {
//   uploadFile
// } = require('./gDriveSync')
// // copyToDesktop(sourceDirPath, fileName)
// // gDriveUtil.createDriveFolder(sourceDirPath, fileName)

const filesToSync = {
  drive: new Set(),
  disk: new Set()
}

const handleSelection = (fileName, type, isSelected) => {
  isSelected ? filesToSync[type].add(fileName) : filesToSync[type].delete(fileName)
  console.log(type, filesToSync[type])
}

// const syncFilesToDrive = () => {

// }

// const syncFilesToDisk = () => {
//   filesToSync.disk.values().forEach(file => {

//   })
// }

// const syncFiles = () => {
//   syncFilesToDrive()
//   syncFilesToDisk()
// }

module.exports = {
  handleSelection: handleSelection,
  // syncFiles: syncFiles
}