const fs = require('fs')
const path = require('path')

const copyFileToDisk = (sourceDir, targetDir, fileName, eventEmitter) => {
  const sourceFile = path.join(sourceDir, fileName)
  const targetFile = path.join(targetDir, fileName)
  const readStream = fs.createReadStream(sourceFile)
  const writeStream = fs.createWriteStream(targetFile)
  
  readStream.pipe(writeStream)
 
  writeStream.on('close', () => {
    eventEmitter.send('disk-write-success', {
      targetDir: targetDir,
      fileName: fileName,
    })
  })

  writeStream.on('error', (err) => {
    eventEmitter.send('disk-write-error', {
      targetDir: targetDir,
      fileName: fileName,
      error: err,
    })
  })

  readStream.on('error', (err) => {
    eventEmitter.send('disk-write-error', {
      targetDir: targetDir,
      fileName: fileName,
      error: err,
    })
  })
}

module.exports = {
  copyFileToDisk: copyFileToDisk
}
