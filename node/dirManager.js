const fs = require('fs')
const {
  existingThumbs,
  thumbExists,
  generateThumb,
  emitThumbName,
} = require('./thumbnailsManager')
// const {
//   THUMBS_DIR,
// } = require('./constants/thumbnails')

const JPG_EXTENSION = '.jpg'

const fetchSourceDirContents = (sourceDir, eventEmitter) => {
  const thumbsDirEmpty = existingThumbs().size == 0
  fs.readdir(sourceDir, (err, dirContents) => {

    const jpgs = []
    dirContents.forEach( fileName => {
      // fileName = fileName.slice(2)

      if (isJPG(fileName)) {
        jpgs.push(fileName)
        if (thumbsDirEmpty || !thumbExists(fileName)) {
          generateThumb(sourceDir, fileName, eventEmitter)
        } else {
          emitThumbName(fileName, eventEmitter)
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