require('dotenv').config()
const electron = require('electron')
const {
  app,
  dialog,
  ipcMain
} = electron
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let windowMainImg, windowImgNav, devEnv
let dirs = {
  source: '',
  targets: [],
}

const driveAuth = require('./src/driveAuth')
const { indexThumbs } = require('./src/thumbnailsManager')
const {
  fetchSourceDirContents,
  emitTargetDirContents,
} = require('./src/dirManager')
const {
  syncFiles,
  createDriveDir,
} = require('./src/syncManager')
const {
  THUMBS_DIR,
} = require('./src/constants/thumbnails')

function createWindows () {
  devEnv = process.argv[2] === 'dev'
  // Create the browser window.
  windowMainImg = new BrowserWindow({
    width: 1400, 
    height: 850, 
    webPreferences: {
      //need to load local resources when using dev server
      webSecurity: !devEnv
    }
  })
  windowImgNav = new BrowserWindow({
    width: 380, 
    height: 850, 
    webPreferences: {
      webSecurity: !devEnv
    }
  })

  // and load the index.html of the app.
  if(devEnv) {
    windowMainImg.loadURL(url.format({
      pathname: path.join(__dirname, 'src', 'ui','index.html'),
      protocol: 'file:',
      slashes: true
    }))
    windowImgNav.loadURL('http://localhost:3000')
  } else {
    windowMainImg.loadURL(url.format({
      pathname: path.join(__dirname, 'src', 'ui','index.html'),
      protocol: 'file:',
      slashes: true
    }))
    windowImgNav.loadURL(url.format({
      pathname: path.join(__dirname, 'build','index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  // Open the DevTools.
  // windowMainImg.webContents.openDevTools()

  // Emitted when the window is closed.
  windowMainImg.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    windowMainImg = null
  })
  windowImgNav.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    windowImgNav = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindows()
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
  if (windowMainImg === null) {
    createWindows()
  }
})

const selectSourceDir = event => {
  //open chrome directory-select dialog
  dialog.showOpenDialog(windowImgNav, {
    properties: ['openDirectory']
  }, 
  selectedDirs => {
    if (selectedDirs) {
      dirs.source = selectedDirs[0]
      windowImgNav.webContents.send('source-dir-selection', selectedDirs[0])
      fetchSourceDirContents(selectedDirs[0], windowImgNav.webContents)
    }
  })
}

const selectTargetDir = event => {
  //open chrome directory-select dialog
  dialog.showOpenDialog(windowImgNav, {
    properties: ['openDirectory']
  }, 
  selectedDirs => {
    if (selectedDirs) {
      dirs.targets.push(selectedDirs[0])
      windowImgNav.webContents.send('target-dir-selection', dirs.targets)
      emitTargetDirContents({
        eventEmitter: windowImgNav.webContents,
        dir: selectedDirs[0]
      })
    }
  })
}

const sync = (event, syncData) => {
  syncFiles(syncData, dirs, windowImgNav.webContents)
}

const authDrive = () => {
  driveAuth.init(windowImgNav.webContents)
}

const clearDiskDirs = () => {
  dirs.targets = []
  dirs.source = ''
}


ipcMain.on('sync', sync)

ipcMain.on('auth-drive', authDrive)

ipcMain.on('create-drive-dir', createDriveDir)

ipcMain.on('source-dir-selection', selectSourceDir)

ipcMain.on('target-dir-selection', selectTargetDir)

ipcMain.on('clear-disk-dirs', clearDiskDirs)

ipcMain.on('set-main-img', (e, payload) =>  windowMainImg.webContents.send('set-main-img', payload))