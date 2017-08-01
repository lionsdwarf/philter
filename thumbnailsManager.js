const fs = require('fs')
const sharp = require('sharp')

const THUMBS_DIR = './.thumbnails/'

const resize = (sourceDir, fileName) => {
  console.log(sourceDir + '/' + fileName)
  sharp(sourceDir + '/' + fileName)
    .resize(120, 80)
    .toFile(THUMBS_DIR + fileName)
    .then( thumbnail => console.log(thumbnail))
}

const thumbsDirExists = () => {
  return fs.existsSync(THUMBS_DIR)
}

const generateThumbsDir = () => {
  fs.mkdirSync(THUMBS_DIR)
}

const indexThumbs = () => {
  fs.readdir(THUMBS_DIR, (err, dirContents) => {
    return new Set(dirContents)
  })
}

module.exports = {
  indexThumbs: indexThumbs,
  thumbsDirExists: thumbsDirExists,
  generateThumbsDir: generateThumbsDir
}