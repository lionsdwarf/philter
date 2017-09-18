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

    const jpgs = []

    dirContents.forEach( async fileName => {
      if (isJPG(fileName)) {
        jpgs.push(fileName)
    
        if (thumbsDirEmpty || !thumbExists(fileName)) {
          const thumbOrientation = await generateThumb(sourceDir, fileName, eventEmitter)
          const orientationData = {
            fileName: fileName,
            orientation: thumbOrientation
          }
          eventEmitter.send('jpg-orientation', orientationData)
        } else {
          emitThumbName(fileName, eventEmitter)
        }

      }
    })
    eventEmitter.send('source-dir-contents', jpgs)
    // emitImgOrientations(sourceDir, jpgs, eventEmitter)
  })
}

// async function emitImgOrientations(sourceDir, jpgs, eventEmitter) {
//   const orientations = await jpgs.map(async jpg => {
//     const img = sharp(path.join(sourceDir, jpg))
//     const orientation = await getOrientation(img)
//     console.log('o', orientation)
//     const orientationData = {}
//     orientationData[jpg] = orientation
//     return orientationData
//   })
//   console.log('od', orientations)
//   eventEmitter.send('img-orientations', orientations)
// }

const isJPG = fileName => {
  return fileName.substr(fileName.length - 4).toLowerCase() === JPG_EXTENSION
}

module.exports = {
  fetchSourceDirContents: fetchSourceDirContents,
}