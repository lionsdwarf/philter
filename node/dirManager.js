const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const {
  existingThumbs,
  thumbExists,
  generateThumb,
  emitImgMetadata,
  getMetadata,
} = require('./thumbnailsManager')

const JPG_EXTENSION = '.jpg'

const fetchSourceDirContents = (sourceDir, eventEmitter) => {
  const thumbsDirEmpty = existingThumbs().size == 0
  fs.readdir(sourceDir, (err, dirContents) => {

    let jpgs = []
    let jpgMetadata

    dirContents.forEach( async fileName => {

      if (isJPG(fileName)) {
        jpgs.push(fileName)

        if (thumbsDirEmpty || !thumbExists(fileName)) {
          generateThumb(sourceDir, fileName, eventEmitter)

        } else {
          //if thumb exists, fetch img orientation from source img metadata
          const img = sharp(path.join(sourceDir, fileName))
          jpgMetadata = await getMetadata(img)
          emitImgMetadata(fileName, jpgMetadata, eventEmitter)
        }

      }

    })
    eventEmitter.send('source-dir-contents', jpgs)
  })
}

const isJPG = fileName => {
  return fileName.substr(fileName.length - 4).toLowerCase() === JPG_EXTENSION
}

module.exports = {
  fetchSourceDirContents: fetchSourceDirContents,
}