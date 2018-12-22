const path = require('path')
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

const setMainImg = (payload) => {
  const rootEl = document.getElementById('root')
  rootEl.innerHTML = ''
  const img = document.createElement('img')
  img.src = `${path.join(payload.sourceDir, payload.fileName)}`
  rootEl.append(img)
}

ipcRenderer.on('set-main-img', (e, payload) => setMainImg(payload))
