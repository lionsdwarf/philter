const {
  ipcRenderer,
} = require('electron')
const fs = require('fs')
const sharp = require('sharp')
const {
  THUMBS_DIR
} = require('./constants/thumbnails')

let existingThumbs = new Set()

const THUMB_WIDTH = 120
const THUMB_HEIGHT = 80

async function generateThumb (sourceDir, fileName, eventEmitter) {
  sharp(sourceDir + '/' + fileName)
    .resize(THUMB_WIDTH, THUMB_HEIGHT)
    .toFile(THUMBS_DIR + fileName)
    .then( thumb => {
      emitThumbName(fileName, eventEmitter)
    })
}

const emitThumbName = (fileName, eventEmitter) => {
  eventEmitter.send('thumb-fileName', fileName)
}

const emitThumbsPath = (eventEmitter) => {
  eventEmitter.send('thumbs-dir', THUMBS_DIR)
}

const thumbExists = (fileName) => {
  return existingThumbs.has(fileName)
}

const thumbsDirExists = () => {
  return fs.existsSync(THUMBS_DIR)
}

const generateThumbsDir = () => {
  fs.mkdirSync(THUMBS_DIR)
}

const indexThumbs = () => {
  fs.readdir(THUMBS_DIR, (err, dirContents) => {
    existingThumbs = new Set(dirContents)
  })
}

const initThumbs = (eventEmitter) => {
  thumbsDirExists() ? indexThumbs() : generateThumbsDir()
}

module.exports = {
  initializeThumbnails: initThumbs,
  thumbExists: thumbExists,
  generateThumb: generateThumb,
  emitThumbsPath: emitThumbsPath,
  emitThumbName: emitThumbName,
  existingThumbs: () => existingThumbs,
}