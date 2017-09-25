const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

const actionMappings = {
  'source-dir-selection': 'SET_SOURCE_DIR',
  'target-dir-selection': 'ADD_TARGET_DIRS',
  'source-dir-contents': 'SET_SOURCE_JPGS',
  'drive-dirs': 'SET_DRIVE_DIRS',
  'jpg-metadata': 'SET_JPG_METADATA',
  'thumbs-source-dir': 'SET_THUMBS_SOURCE_DIR',
  'thumb': 'SET_THUMB',
  'disk-target-dir-contents': 'SET_DISK_TARGET_DIR_CONTENTS'
}

export const initListeners = dispatch => {

  for (let nodeAction in actionMappings) {
    ipcRenderer.on(nodeAction, (event, payload) => {
      dispatch({
        type: actionMappings[nodeAction],
        payload: payload
      })
    })
  }  

}

