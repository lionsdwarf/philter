const fs = require('fs')
const path = require('path')

const OLY_RAW_FILE_EXT = '.ORF'

const swapRawFileExtension = jpgFileName => {
  return jpgFileName.substr(0, jpgFileName.length - 4) + OLY_RAW_FILE_EXT
}

const isRawSibling = (sourceDir, jpgFileName) => {
  const rawFileName = swapRawFileExtension(jpgFileName)
  const rawFile = path.join(sourceDir, rawFileName)
  return fs.existsSync(rawFile)
}
// If RAW file exists, write both .jpg and RAW files to Disk, otherwise just write the .jpg
const copyFileToDisk = (sourceDir, targetDir, fileName, eventEmitter) => {

  writeFile(sourceDir, targetDir, fileName, eventEmitter)

  if (isRawSibling(sourceDir, fileName)) {
    writeFile(sourceDir, targetDir, swapRawFileExtension(fileName), eventEmitter)
  }
 
}

const writeFile = (sourceDir, targetDir, fileName, eventEmitter) => {
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
    console.log('Disk write stream error: ', err)
    eventEmitter.send('disk-write-error', {
      targetDir: targetDir,
      fileName: fileName,
      error: err,
    })
  })

  readStream.on('error', (err) => {
    console.log('Disk read stream error: ', err)
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
