const {
  ipcRenderer,
} = require('electron')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const {
  THUMBS_DIR
} = require('./constants/thumbnails')

let existingThumbs = new Set()

//null dimension preserves aspect ratio
const WIDTH = null
const LENGTH = 120

async function generateThumb(sourceDir, fileName, eventEmitter) {
  const thumb = sharp(path.join(sourceDir, fileName))
  const metadata = await getMetadata(thumb)
  metadata.orientation === 1 || metadata.orientation === 3 ?
    thumb.resize(LENGTH, WIDTH)
    :
    thumb.resize(WIDTH, LENGTH)
  thumb.rotate()
    .toFile(THUMBS_DIR + fileName)
    .then( (thumb, two) => {
      emitImgMetadata(fileName, metadata, eventEmitter)
    })
  return metadata
}

async function getMetadata(img) {
  const metadata = await img.metadata()
  return metadata
}

const emitImgMetadata = (fileName, metadata, eventEmitter) => {
  const imgMetadata = {
    fileName: fileName,
    metadata: metadata,
  }
  eventEmitter.send('img-metadata', imgMetadata)
}

const thumbExists = (fileName) => {
  return existingThumbs.has(fileName)
}

const indexThumbs = () => {
  fs.readdir(THUMBS_DIR, (err, dirContents) => {
    existingThumbs = new Set(dirContents)
  })
}

module.exports = {
  indexThumbs: indexThumbs,
  thumbExists: thumbExists,
  generateThumb: generateThumb,
  emitImgMetadata: emitImgMetadata,
  getMetadata: getMetadata,
  existingThumbs: () => existingThumbs,
}