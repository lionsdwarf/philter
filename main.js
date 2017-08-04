const electron = require('electron')
const {
  app,
  dialog
} = electron
const fs = require('fs')
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const gDriveAuth = require('./gDriveAuth')

const {
  THUMBS_DIR
} = require('./constants/thumbnails')

let mainWindow
let dirs = {}
let existingThumbs = new Set()

const thumbsDirExists = () => {
  return fs.existsSync(THUMBS_DIR)
}

const generateThumbsDir = () => {
  fs.mkdirSync(THUMBS_DIR)
}

const indexThumbs = () => {
  fs.readdir(THUMBS_DIR, (err, dirContents) => {
    existingThumbs = new Set(dirContents)
  })
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1100, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
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
  if (thumbsDirExists()) {
    indexThumbs()
  } else {
    generateThumbsDir()
  }
  gDriveAuth(mainWindow.webContents)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

exports.envPath = () => {
  return process.argv[0]
}

exports.selectDir = dirType => {
  //open chrome directory-select dialog
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  }, 
  selectedDir => {
    dirs[dirType] = selectedDir[0]
    // exports.dirs = dirs
    mainWindow.webContents.send(dirType + '-dir-selection', dirs)
  })
}

exports.existingThumbs = () => {
  return existingThumbs
}

