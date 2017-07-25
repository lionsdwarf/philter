const electron = require('electron')
const {
  ipcRenderer
} = electron

ipcRenderer.on('gDrive-access-token', (event, accessToken) => {
  console.log('rendererAT', accessToken)
})

const upload = () => {

}

module.exports = {
  upload: upload
}
