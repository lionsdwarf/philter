const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export const selectDir = type => {
  ipcRenderer.send('directory-selection', type)
}