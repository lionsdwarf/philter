const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export const configureListeners = dispatch => {
  
  ipcRenderer.on('dir-selection', (event, payload) => {
    dispatch({
      type: 'SET_' + payload.dirType.toUpperCase() + '_DIR',
      payload: payload.dir
    })
  })

  ipcRenderer.on('source-dir-contents', (event, payload) => {
    dispatch({
      type: 'SET_SOURCE_JPGS',
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
