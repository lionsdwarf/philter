const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const {
  existingThumbs,
  thumbExists,
  generateThumb,
  emitThumb,
} = require('./thumbnailsManager')

const JPG_EXTENSION = '.jpg'

const fetchSourceDirContents = (sourceDir, eventEmitter) => {
  const thumbsDirEmpty = existingThumbs().size == 0
  fs.readdir(sourceDir, (err, dirContents) => {

    let jpgs = []
    dirContents.forEach( async fileName => {

      let img
      if (isJPG(fileName)) {
        
        jpgs.push(fileName)

        if (thumbsDirEmpty || !thumbExists(fileName)) {
          
          img = await generateThumb(sourceDir, fileName, eventEmitter)

        } else {
          //if thumb exists, fetch img orientation from source img metadata
          emitThumb(fileName, eventEmitter)

        }

        if (!img) {
          img = sharp(path.join(sourceDir, fileName))
        }
        emitMetadata(img, fileName, eventEmitter)

      }

    })
    eventEmitter.send('source-dir-contents', jpgs)
  })
}

async function emitMetadata(img, fileName, eventEmitter) {
  const metadata = await img.metadata()
  delete metadata.exif
  eventEmitter.send('jpg-metadata', {
    fileName: fileName,
    metadata: metadata,
  })
}

const isJPG = fileName => {
  return fileName.substr(fileName.length - 4).toLowerCase() === JPG_EXTENSION
}

module.exports = {
  fetchSourceDirContents: fetchSourceDirContents,
}