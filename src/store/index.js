import { combineReducers } from 'redux'
import {
  addFileName,
  toggleStaged,
} from './util'

const dirs = (state = {
  source: '',
  target: '',
  drive: [],
  driveDefaultDirId: '',
  // app: '',
}, action) => {
  switch(action.type) {
    case 'SET_SOURCE_DIR':
      return {...state, source: action.payload}
      break
    case 'SET_TARGET_DIR':
      return {...state, target: action.payload}
      break
    case 'SET_DRIVE_DIRS': 
      return {...state, drive: action.payload}
      break
    case 'SET_DRIVE_DEFAULT_DIR':
      return {...state, driveDefaultDirId: action.payload}
      break
    // case 'SET_APP_DIR':
    //   return {...state, app: action.payload + '/.thumbnails/'}
    //   break
    default:
      return state
  }
}

const thumbs = (state = {
  fileNames: new Set(),
}, action) => {
  switch(action.type) {
    case 'SET_THUMB_FILENAME':
      return {...state, fileNames: addFileName(state.fileNames, action.payload)}
      break
    // case 'CLEAR_THUMB_FILENAMES':
    //   return {...state, fileNames: new Set()}
    //   break
    default:
      return state
  }
}

const sourceContents = (state = {
  jpgs: []
}, action) => {
  switch(action.type) {
    case 'SET_SOURCE_JPGS':
      return {...state, jpgs: action.payload}
      break
    default:
      return state
  }
}

const filesToSync = (state = {
  drive: new Set(),
  disk: new Set(),
}, action) => {
  switch(action.type) {
    case 'TOGGLE_DRIVE_SYNC':
      return {...state, drive: toggleStaged(state.drive, action.payload, action.toStage)}
      break
    case 'TOGGLE_DISK_SYNC':
      return {...state, disk: toggleStaged(state.disk, action.payload, action.toStage)}
      break
    default:
      return state  
  }
}

const philter = combineReducers({
  dirs,
  thumbs,
  sourceContents,
  filesToSync,
})

export default philter