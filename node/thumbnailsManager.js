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
  const orientation = await getOrientation(thumb)
  orientation === 1 || orientation === 3 ?
    thumb.resize(LENGTH, WIDTH)
    :
    thumb.resize(WIDTH, LENGTH)
  thumb.rotate()
    .toFile(THUMBS_DIR + fileName)
    .then( (thumb, two) => {
      emitThumbName(fileName, eventEmitter)
    })
  return orientation
}

async function getOrientation(img) {
  const metadata = await img.metadata()
  return metadata.orientation
}

const emitThumbName = (fileName, eventEmitter) => {
  eventEmitter.send('thumb-fileName', fileName)
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
  emitThumbName: emitThumbName,
  getOrientation: getOrientation,
  existingThumbs: () => existingThumbs,
}