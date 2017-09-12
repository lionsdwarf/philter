const fs = require('fs')
const path = require('path')

const syncFilesToDisk = (diskFiles, sourceDir, targetDir) => {
  for(let fileName in diskFiles) {
    for (let targetDir of diskFiles[fileName]) {
      copyFileToDisk(sourceDir, targetDir, fileName)
    }
  }
}

const copyFileToDisk = (sourceDir, targetDir, fileName) => {
  const sourceFile = path.join(sourceDir, fileName)
  const targetFile = path.join(targetDir, fileName)
  // ensure that file doesn't already exist && return list of dupe filenames
  fs.createReadStream(sourceFile).pipe(fs.createWriteStream(targetFile))
}

module.exports = {
  syncFilesToDisk: syncFilesToDisk
}
