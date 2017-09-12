const fs = require('fs')
const path = require('path')

const copyFileToDisk = (sourceDir, targetDir, fileName) => {
  const sourceFile = path.join(sourceDir, fileName)
  const targetFile = path.join(targetDir, fileName)
  // ensure that file doesn't already exist && return list of dupe filenames
  fs.createReadStream(sourceFile).pipe(fs.createWriteStream(targetFile))
}

module.exports = {
  copyFileToDisk: copyFileToDisk
}
