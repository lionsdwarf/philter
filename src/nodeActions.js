const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export const selectDir = type => {
  ipcRenderer.send('directory-selection', type)
}

export const sync = (filesToSync, driveDefaultDirId) => {
  ipcRenderer.send('sync', {
    filesToSync: filesToSync,
    driveDefaultDirId: driveDefaultDirId,
  })
}

export const authDrive = () => {
  ipcRenderer.send('auth-drive')
}

export const createDriveDir = (dirName) => {
  ipcRenderer.send('create-drive-dir', dirName)
}