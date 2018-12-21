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
  const thumbsDirEmpty = existingThumbs().size === 0
  fs.readdir(sourceDir, (err, dirContents) => {

    let jpgs = []
    const validImages = filterDirContent(dirContents)
    validImages.forEach( async fileName => {

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

const isDotFile = fileName => fileName.substring(0, 1) === '.'
 // Some SSDs maintain deleted files as dot files until overwritten. We ignore such files.
 const filterDirContent = files => files.filter(fileName => !isDotFile(fileName))

async function emitTargetDirContents(payload) {
  fs.readdir(payload.dir, (err, dirContents) => {
    const jpgs = dirContents.filter(
      file => isJPG(file)
    )
    payload.eventEmitter.send('disk-target-dir-contents', {
      dirContents: jpgs,
      dir: payload.dir,
    })
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
  emitTargetDirContents: emitTargetDirContents,
}