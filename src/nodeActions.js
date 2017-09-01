import React from 'react'
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export const selectDir = type => {
  ipcRenderer.send('disk-dir-selection', type)
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

export const init = () => {
  fetchThumbsSourceDir()
  authDrive()
}