const electron = require('electron')
const {
  app,
  dialog,
  ipcMain
} = electron
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow, devEnv
let dirs = {
  source: '',
  targets: [],
}

const driveAuth = require('./node/driveAuth')
const {
  indexThumbs,
} = require('./node/thumbnailsManager')
const {
  fetchSourceDirContents,
  emitTargetDirContents,
} = require('./node/dirManager')
const {
  syncFiles,
  createDriveDir,
} = require('./node/syncManager')
const {
  THUMBS,
} = require('./node/constants/thumbnails')

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1400, height: 850})

  // and load the index.html of the app.
  devEnv = process.argv[3] === 'dev'  
  devEnv ?
    mainWindow.loadURL('http://localhost:3000')
    :
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'public','index.html'),
      protocol: 'file:',
      slashes: true
    }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()
  indexThumbs()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

const selectSourceDir = event => {
  //open chrome directory-select dialog
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  }, 
  selectedDirs => {
    if (selectedDirs) {
      dirs.source = selectedDirs[0]
      mainWindow.webContents.send('source-dir-selection', selectedDirs[0])
      fetchSourceDirContents(selectedDirs[0], mainWindow.webContents)
    }
  })
}

const selectTargetDir = event => {
  //open chrome directory-select dialog
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  }, 
  selectedDirs => {
    if (selectedDirs) {
      dirs.targets.push(selectedDirs[0])
      mainWindow.webContents.send('target-dir-selection', dirs.targets)
      emitTargetDirContents({
        eventEmitter: mainWindow.webContents,
        dir: selectedDirs[0]
      })
    }
  })
}

const sync = (event, syncData) => {
  syncFiles(syncData, dirs, mainWindow.webContents)
}

const authDrive = () => {
  driveAuth.init(process.argv[2], mainWindow.webContents)
}

const fetchThumbsSourceDir = () => {
  mainWindow.webContents.send('thumbs-source-dir', {
    dir: THUMBS, 
    devEnv: devEnv
  })
}

const clearDiskDirs = () => {
  dirs.targets = []
  dirs.source = ''
}

ipcMain.on('sync', sync)

// ipcMain.on('auth-drive', authDrive)

ipcMain.on('create-drive-dir', createDriveDir)

ipcMain.on('source-dir-selection', selectSourceDir)

ipcMain.on('target-dir-selection', selectTargetDir)

ipcMain.on('fetch-thumbs-source-dir', fetchThumbsSourceDir)

ipcMain.on('clear-disk-dirs', clearDiskDirs)
