const {
  ipcRenderer,
} = require('electron')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const {
  REL_THUMBS_DIR,
  THUMBS_DIR
} = require('./constants/thumbnails')

let existingThumbs = new Set()

//null dimension preserves aspect ratio
const WIDTH = null
const LENGTH = 120

async function generateThumb(sourceDir, fileName, eventEmitter) {
  const thumb = sharp(path.join(sourceDir, fileName))
  thumb.resize(LENGTH, WIDTH)
    .rotate()
    // .toFile('build/' + fileName)
    .toFile(path.join(THUMBS_DIR + fileName))
    // .toFile('.thumbnails/' + fileName)
    .then( (thumb, two) => {
      emitThumb(fileName, eventEmitter)
    })
  return thumb
}

const emitThumb = (fileName, eventEmitter) => {
  const imgMetadata = {
    fileName: fileName,
  }
  eventEmitter.send('thumb', imgMetadata)
}

const thumbExists = (fileName) => {
  return existingThumbs.has(fileName)
}

const indexThumbs = () => {
  fs.readdir(REL_THUMBS_DIR, (err, dirContents) => {
    existingThumbs = new Set(dirContents)
  })
}

module.exports = {
  indexThumbs: indexThumbs,
  thumbExists: thumbExists,
  generateThumb: generateThumb,
  emitThumb: emitThumb,
  existingThumbs: () => existingThumbs,
}