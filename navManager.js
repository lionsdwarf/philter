const fs = require('fs')
const { 
  remote,
  ipcRenderer,
} = require('electron')
const main = remote.require('./main')
const {
  thumbExists,
  generateThumb,
  renderThumb,
} = require('./thumbnailsManager')
const {
  THUMBS_DIR,
} = require('./constants/thumbnails')
const {
  handleSelection,
  syncFiles
} = require('./syncManager')

const jpgExtension = '.jpg'
let sourceDir
let targetDir

const configureDirSelect = dirType => {
  document.getElementById(dirType + 'Select').addEventListener('click', () => {
    main.selectDir(dirType)
  })
}

configureDirSelect('source')
configureDirSelect('target')

document.getElementById('imgControlItems').addEventListener('click', (e) => {
  renderMainImg(e.srcElement.dataset.fileName)
})

document.getElementById('syncFiles').addEventListener('click', () => {
  syncFiles()
})

ipcRenderer.on('source-dir-selection', (event, dirs) => {
  //clear thumbs dir
  sourceDir = dirs.source
  renderSelectedDir('sourceDir', dirs.source)
  renderFolderContents() 
})

ipcRenderer.on('target-dir-selection', (event, dirs) => {
  targetDir = dirs.target
  renderSelectedDir('targetDir', dirs.target)
})

const renderMainImg = fileName => {
  document.getElementById('mainImg').src = sourceDir + '/' + fileName
}

const generateImgPreview = fileName => {
  const imgPreview = document.createElement('div')
  const textWrapper = document.createElement('span')
  const text = document.createTextNode(fileName)
  imgPreview.id = fileName
  imgPreview.dataset.fileName = fileName
  textWrapper.dataset.fileName = fileName
  textWrapper.appendChild(text)
  imgPreview.appendChild(textWrapper)
  return imgPreview
}

const generateSyncInput = (fileName, type) => {
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.value = type
  input.dataset.fileName = fileName
  input.addEventListener('click', () => handleSelection(fileName, type, input.checked))
  return input
}

const generateSyncControl = (fileName) => {
  const syncControl = document.createElement('fieldset')
  const driveSyncInput = generateSyncInput(fileName, 'drive')
  const diskSyncInput = generateSyncInput(fileName, 'disk')
  syncControl.appendChild(driveSyncInput)
  syncControl.appendChild(diskSyncInput)
  syncControl.dataset.fileName = fileName
  return syncControl
}

const renderImgControlItem = (fileName) => {
  const imgPreview = generateImgPreview(fileName)
  const syncControl = generateSyncControl(fileName)
  document.getElementById('imgControlItems').appendChild(imgPreview).appendChild(syncControl)
}

const renderSelectedDir = (dirType, dir) => {
  document.getElementById(dirType).innerHTML = dir
}
  
const renderFolderContents = () => {
  const thumbsDirEmpty = main.existingThumbs().size == 0
  fs.readdir(sourceDir, (err, dirContents) => {

    dirContents.forEach( fileName => {
      
      fileName = fileName.slice(2)

      if (isJPG(fileName)) {
        renderImgControlItem(fileName)

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

module.exports = {
  getSourceDir: () => sourceDir,
  getTargetDir: () => targetDir,
}