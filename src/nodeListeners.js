const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export const initListeners = dispatch => {
  
  ipcRenderer.on('source-dir-selection', (event, payload) => {
    console.log('1',payload)
    dispatch({
      type: 'SET_SOURCE_DIR',
      payload: payload
    })
  })

  ipcRenderer.on('target-dir-selection', (event, payload) => {
    console.log('2',payload)
    dispatch({
      type: 'SET_TARGET_DIR',
      payload: payload
    })
  })

  ipcRenderer.on('source-dir-contents', (event, payload) => {
    dispatch({
      type: 'SET_SOURCE_JPGS',
      payload: payload
    })
  })

  ipcRenderer.on('drive-dirs', (event, payload) => {
    dispatch({
      type: 'SET_DRIVE_DIRS',
      payload: payload
    })
  })

  ipcRenderer.on('thumb-fileName', (event, payload) => {
    dispatch({
      type: 'SET_THUMB_FILENAME',
      payload: payload
    })
  })

  ipcRenderer.on('thumbs-source-dir', (event, payload) => {
    dispatch({
      type: 'SET_THUMBS_SOURCE_DIR',
      payload: payload
    })
  })

}
