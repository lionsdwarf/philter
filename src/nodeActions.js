import React from 'react'
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
    filesToSync: filesToSync,
    defaultDirId: defaultDirId,
  })
}

export const createDriveDir = (dirName) => {
  ipcRenderer.send('create-drive-dir', dirName)
}

const authDrive = () => {
  ipcRenderer.send('auth-drive')
}

const fetchThumbsSourceDir = () => {
  ipcRenderer.send('fetch-thumbs-source-dir')
}

const clearDiskDirs = () => {
  console.log('1')
  ipcRenderer.send('clear-disk-dirs')
}

export const init = () => {
  clearDiskDirs()
  fetchThumbsSourceDir()
  authDrive()
}