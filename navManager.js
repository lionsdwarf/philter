const fs = require('fs')
const { 
  remote,
  ipcRenderer
} = require('electron')
const main = remote.require('./main')
const {
  thumbExists,
  generateThumb,
  renderThumb
} = require('./thumbnailsManager')
const {
  THUMBS_DIR
} = require('./constants/thumbnails')

const jpgExtension = '.jpg'

const configureDirSelect = dirType => {
  document.getElementById(dirType + 'Select').addEventListener('click', () => {
    main.selectDir(dirType)
  })
}

configureDirSelect('source')
configureDirSelect('target')

document.getElementById('imgNav').addEventListener('click', (e) => {
  renderMainImg(e.srcElement.dataset.fileName)
})

ipcRenderer.on('source-dir-selection', (event, dirs) => {
  //clear thumbs dir
  sourceDir = dirs.source
  renderFolderContents()  
})

const renderMainImg = fileName => {
  document.getElementById('mainImg').src = sourceDir + '/' + fileName
}

const renderItem = (fileName) => {
  const navItem = document.createElement('div')
  const textWrapper = document.createElement('span')
  const text = document.createTextNode(fileName)
  navItem.id = fileName
  navItem.dataset.fileName = fileName
  textWrapper.dataset.fileName = fileName
  textWrapper.appendChild(text)
  navItem.appendChild(textWrapper)
  document.getElementById('imgNav').appendChild(navItem)
}
  
const renderFolderContents = () => {
  const thumbsDirEmpty = main.existingThumbs().size == 0
  fs.readdir(sourceDir, (err, dirContents) => {

    dirContents.forEach( fileName => {
      
      fileName = fileName.slice(2)

      if (isJPG(fileName)) {
        renderItem(fileName)

        if (thumbsDirEmpty || !thumbExists(fileName)) {
          generateThumb(sourceDir, fileName)
        } else {
          renderThumb(THUMBS_DIR, fileName)
        }

      }

    })

  })
}

const isJPG = fileName => {
  return fileName.substr(fileName.length - 4).toLowerCase() === jpgExtension
}