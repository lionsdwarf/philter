const electron = require('electron')
const {
  app,
  dialog,
  ipcMain
} = electron
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow, drive
let dirs = {}

const authenticateDrive = require('./node/gDriveAuth')
const {
  initializeThumbnails ,
  emitThumbsPath,
} = require('./node/thumbnailsManager')
const {
  fetchSourceDirContents
} = require('./node/dirManager')

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))
  mainWindow.loadURL('http://localhost:3000')

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
  authenticateDrive(process.argv[2])
  initializeThumbnails()
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

exports.envPath = () => process.argv[1]

const selectDir = (event, dirType) => {
  //open chrome directory-select dialog
  emitThumbsPath(mainWindow.webContents)
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  }, 
  selectedDirs => {
    if (selectedDirs) {
      dirs[dirType] = selectedDirs[0]
      mainWindow.webContents.send('dir-selection', {
        dir: selectedDirs[0],
        dirType: dirType
      })
      if (dirType === 'source') {
        fetchSourceDirContents(selectedDirs[0], mainWindow.webContents)
      }
    }
  })
}

ipcMain.on('directory-selection', selectDir)
