const fs = require('fs')
const path = require('path')

const OLYMPUS_RAW_FILE_EXT = 'ORF'

const swapRawFileExtension = jpgFileName => {
  return jpgFileName.substr(0, jpgFileName.length - 3) + OLYMPUS_RAW_FILE_EXT
}

//if raw file exists, write it to disk, otherwise write jpg
const getSourceFileName = (sourceDir, jpgFileName) => {
  const rawFileName = swapRawFileExtension(jpgFileName)
  const rawFile = path.join(sourceDir, rawFileName)
  return fs.existsSync(rawFile) ? rawFileName : jpgFileName
}

const copyFileToDisk = (sourceDir, targetDir, fileName, eventEmitter) => {
  const sourceFileName = getSourceFileName(sourceDir, fileName)
  const sourceFile = path.join(sourceDir, sourceFileName)
  const targetFile = path.join(targetDir, sourceFileName)
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
