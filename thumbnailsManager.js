const {
  remote
} = require('electron')
const main = remote.require('./main')
const fs = require('fs')
const sharp = require('sharp')
const {
  THUMBS_DIR
} = require('./constants/thumbnails')

let existingThumbs = new Set()

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
  thumb.dataset.fileName = fileName
  parentDiv.appendChild(thumb)
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

const initThumbs = () => {
  thumbsDirExists() ? indexThumbs() : generateThumbsDir()
}

module.exports = {
  initThumbs: initThumbs,
  thumbExists: thumbExists,
  generateThumb: generateThumb,
  renderThumb: renderThumb,
  existingThumbs: () => existingThumbs,
}