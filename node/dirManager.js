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
const OLY_RAW_FILE_EXTENSION = '.ORF'

const fetchSourceDirContents = (sourceDir, eventEmitter) => {
  const thumbsDirEmpty = existingThumbs().size == 0
  fs.readdir(sourceDir, (err, dirContents) => {

    let jpgs = []
    const validImages = filterDirContent(dirContents)
    let rawSiblings = new Set(getRawFileNames(validImages))

    validImages.forEach( async fileName => {

      let img
      if (isJPG(fileName)) {
        
        jpgs.push(fileName)

        if (thumbsDirEmpty || !thumbExists(fileName)) {
          
          img = await generateThumb(sourceDir, fileName, eventEmitter)

        } else {

          emitThumb(fileName, eventEmitter)

        }

        if (!img) {
          img = sharp(path.join(sourceDir, fileName))
        }
        emitMetadata(img, fileName, eventEmitter, hasRawSibling(rawSiblings, fileName))

      }

    })
    eventEmitter.send('source-dir-contents', jpgs)
  })
}

const isDotFile = fileName => fileName.substring(0, 1) === '.'
// Some SSDs maintain deleted files as dot files until overwritten. We ignore such files.
const filterDirContent = files => files.filter(fileName => !isDotFile(fileName))

const getRawFileNames = files => files.map(fileName => isOlyRawFile(fileName) && extensionlessFileName(fileName))

const extensionlessFileName = fileName => fileName.substring(0, fileName.length - 4)

const isOlyRawFile = fileName => fileName.substr(fileName.length - 4) === OLY_RAW_FILE_EXTENSION

const isJPG = fileName => fileName.substr(fileName.length - 4).toLowerCase() === JPG_EXTENSION

const hasRawSibling = (rawSiblings, jpgFileName) => rawSiblings.has(extensionlessFileName(jpgFileName))

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

async function emitMetadata(img, fileName, eventEmitter, hasRawSibling) {
  const metadata = await img.metadata()
  delete metadata.exif
  eventEmitter.send('jpg-metadata', {
    fileName,
    metadata,
    hasRawSibling,
  })
}

module.exports = {
  fetchSourceDirContents: fetchSourceDirContents,
  emitTargetDirContents: emitTargetDirContents,
}