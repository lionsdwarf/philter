const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

const actionMappings = {
  'source-dir-selection': 'SET_SOURCE_DIR',
  'target-dir-selection': 'ADD_TARGET_DIRS',
  'source-dir-contents': 'SET_SOURCE_JPGS',
  'drive-dirs': 'SET_DRIVE_DIRS',
  'jpg-metadata': 'SET_JPG_METADATA',
  'thumb': 'SET_THUMB',
  'disk-target-dir-contents': 'SET_DISK_TARGET_DIR_CONTENTS',
  'drive-target-dir-contents': 'SET_DRIVE_TARGET_DIR_CONTENTS',
  'disk-write-success': 'SET_DISK_WRITE_SUCCESS',
  'disk-write-error': 'SET_DISK_WRITE_ERROR',
  'drive-write-success': 'SET_DRIVE_WRITE_SUCCESS',
  'drive-write-error': 'SET_DRIVE_WRITE_ERROR',
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

