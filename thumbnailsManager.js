const {
  remote
} = require('electron')
const main = remote.require('./main')
const fs = require('fs')
const sharp = require('sharp')
const {
  THUMBS_DIR
} = require('./constants/thumbnails')

const generateThumb = (sourceDir, fileName) => {
  sharp(sourceDir + '/' + fileName)
    .resize(120, 80)
    .toFile(THUMBS_DIR + fileName)
    .then( thumbnail => console.log(thumbnail))
}

const thumbExists = (fileName) => {
  return main.existingThumbs().has(fileName)
}

module.exports = {
  generateThumb: generateThumb,
  thumbExists: thumbExists
}