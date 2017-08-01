// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
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

const copyToDesktop = (sourceDirPath, fileName) => {
  const userDir = parseUserDir(main.envPath)
  const targetDir = path.join(userDir, '/Desktop/testCopy')
  const targetFile = path.join(targetDir, fileName)
  const sourceFile = path.join(sourceDirPath, fileName)

  // ensure that file doesn't already exist && return list of dupe filenames
  fs.createReadStream(sourceFile).pipe(fs.createWriteStream(targetFile))
}

module.exports = {
  copyToDesktop: copyToDesktop
}
