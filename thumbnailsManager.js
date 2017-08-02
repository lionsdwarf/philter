const {
  remote
} = require('electron')
const main = remote.require('./main')
const fs = require('fs')
const sharp = require('sharp')
const {
  THUMBS_DIR
} = require('./constants/thumbnails')

const THUMB_WIDTH = 120
const THUMB_HEIGHT = 80

const generateThumb = (sourceDir, fileName) => {
  sharp(sourceDir + '/' + fileName)
    .resize(THUMB_WIDTH, THUMB_HEIGHT)
    .toFile(THUMBS_DIR + fileName)
    .then( thumb => renderThumb(THUMBS_DIR, fileName))
}

const renderThumb = (thumbsDir, fileName) => {
  const parentDiv = document.getElementById(fileName)
  const thumb = document.createElement('img')
  thumb.src = thumbsDir + fileName
  parentDiv.appendChild(thumb)
}

const thumbExists = (fileName) => {
  return main.existingThumbs().has(fileName)
}

module.exports = {
  generateThumb: generateThumb,
  thumbExists: thumbExists,
  renderThumb: renderThumb
}