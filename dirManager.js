const fs = require('fs')
const { 
  remote,
  ipcRenderer
} = require('electron')
const main = remote.require('./main.js')

const jpgExtension = '.jpg'

const configureDirSelect = dirType => {
  document.getElementById(dirType + 'Select').addEventListener('click', () => {
    main.selectDir(dirType)
  })
}

configureDirSelect('source')
configureDirSelect('target')

ipcRenderer.on('source-dir-selection', (event, dirs) => {
  renderFolderContents(dirs.source)  
})

const renderItem = (fileName, sourceDir) => {
  const navItem = document.createElement('div')
  const text = document.createTextNode(fileName)
  // const thumbnail = document.createElement('img')
  // thumbnail.src = sourceDir + '/' + fileName
  // console.log(thumbnail)
  // navItem.appendChild(thumbnail)
  navItem.appendChild(text)
  document.getElementById('imgNav').appendChild(navItem)
}
  
const renderFolderContents = (sourceDir) => {
  fs.readdir(sourceDir, (err, dirContents) => {
    dirContents.forEach( fileName => {
      if (isJPG(fileName)) {
        renderItem(fileName, sourceDir)
      }
    })
  })
}

const isJPG = fileName => {
  return fileName.substr(fileName.length - 4).toLowerCase() === jpgExtension
}