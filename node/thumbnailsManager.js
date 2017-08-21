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

async function generateThumb (sourceDir, index, fileName, eventEmitter) {
  const thumbName = 'thumb_' + index + '.jpg'
  sharp(sourceDir + '/' + fileName)
    .resize(THUMB_WIDTH, THUMB_HEIGHT)
    .toFile(THUMBS_DIR + thumbName)
    .then( thumb => {
      emitThumbName([fileName, thumbName], eventEmitter)
    })
}

const emitThumbName = (payload, eventEmitter) => {
  eventEmitter.send('thumb-fileName', payload)
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
  existingThumbs: () => existingThumbs,
}