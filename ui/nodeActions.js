import { formatSyncData } from './util'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export const selectSourceDir = () => {
  ipcRenderer.send('source-dir-selection')
}

export const selectTargetDir = () => {
  ipcRenderer.send('target-dir-selection')
}

export const sync = (filesToSync, defaultDirId) => {
  ipcRenderer.send('sync', {
    filesToSync: formatSyncData(filesToSync),
    defaultDirId: defaultDirId,
  })
}

export const createDriveDir = (dirName) => {
  ipcRenderer.send('create-drive-dir', dirName)
}

export const setMainImg = (sourceDir, fileName) => {
  ipcRenderer.send('set-main-img', {
    sourceDir, 
    fileName
  })
}

const authDrive = () => {
  ipcRenderer.send('auth-drive')
}

const clearDiskDirs = () => {
  ipcRenderer.send('clear-disk-dirs')
}

export const init = () => {
  clearDiskDirs()
  authDrive()
}