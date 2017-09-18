const {
  ipcRenderer,
} = require('electron')
const fs = require('fs')
const sharp = require('sharp')
const {
  THUMBS_DIR
} = require('./constants/thumbnails')

let existingThumbs = new Set()

//null dimension preserves aspect ratio
const WIDTH = null
const LENGTH = 120

async function generateThumb (sourceDir, fileName, eventEmitter) {
  const thumb = sharp(sourceDir + '/' + fileName)
    thumb.metadata()
    .then(function(metadata) {
      metadata.orientation === 1 || metadata.orientation === 3 ?
        thumb.resize(LENGTH, WIDTH)
        :
        thumb.resize(WIDTH, LENGTH)
      thumb.rotate()
        .toFile(THUMBS_DIR + fileName)
        .then( (thumb, two) => {
          emitThumbName(fileName, eventEmitter)
        })
    })
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
  existingThumbs: () => existingThumbs,
}