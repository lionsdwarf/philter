const {
  remote
} = require('electron')
const fs = require('fs')
const path = require('path')
const main = remote.require('./main.js')

const parseUserDir = (path) => {
  const delimiter = '/'
  const tokens = path.split(delimiter)
  tokens.splice(3)
  return tokens.join(delimiter)
}

const copyToDisk = (sourceDir, targetDir, fileName) => {
  const sourceFile = path.join(sourceDir, fileName)
  const targetFile = path.join(targetDir, fileName)
  // ensure that file doesn't already exist && return list of dupe filenames
  fs.createReadStream(sourceFile).pipe(fs.createWriteStream(targetFile))
}

module.exports = {
  copyToDisk: copyToDisk
}
