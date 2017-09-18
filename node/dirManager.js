const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const {
  existingThumbs,
  thumbExists,
  generateThumb,
  emitThumbName,
  getOrientation,
} = require('./thumbnailsManager')

const JPG_EXTENSION = '.jpg'

const fetchSourceDirContents = (sourceDir, eventEmitter) => {
  const thumbsDirEmpty = existingThumbs().size == 0
  fs.readdir(sourceDir, (err, dirContents) => {

    let jpgs = []
    let jpgOrientation

    dirContents.forEach( async fileName => {

      if (isJPG(fileName)) {
        jpgs.push(fileName)

        if (thumbsDirEmpty || !thumbExists(fileName)) {
          jpgOrientation = await generateThumb(sourceDir, fileName, eventEmitter)
        } else {
          //if thumb exists, fetch orientation from source img
          const img = sharp(path.join(sourceDir, fileName))
          jpgOrientation = await getOrientation(img)
          emitThumbName(fileName, eventEmitter)
        }

        emitJpgOrientation(jpgOrientation, fileName, eventEmitter)
    
      }

    })
    eventEmitter.send('source-dir-contents', jpgs)
  })
}

const emitJpgOrientation = (jpgOrientation, fileName, eventEmitter) => {
  const orientation = {
    fileName: fileName,
    orientation: jpgOrientation
  }
  eventEmitter.send('jpg-orientation', orientation)
}

const isJPG = fileName => {
  return fileName.substr(fileName.length - 4).toLowerCase() === JPG_EXTENSION
}

module.exports = {
  fetchSourceDirContents: fetchSourceDirContents,
}