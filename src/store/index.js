import { combineReducers } from 'redux'
import {
  addFileName,
  toggleStaged,
  resolveThumbsSourceDir,
} from './util'

const diskDirs = (state = {
  source: '',
  target: '',
  targetContents: new Set(),
}, action) => {
  switch(action.type) {
    case 'SET_SOURCE_DIR':
      return {...state, source: action.payload}
      break
    case 'SET_TARGET_DIR':
      return {...state, target: action.payload}
      break
    case 'SET_DISK_TARGET_DIR_CONTENTS':
      return {...state, targetContents: new Set(action.payload)}
      break
    default:
      return state
  }
}

const driveDirs = (state = {
  targets: [],
  defaultDirId: '',
  targetContents: new Set(),
}, action) => {
  switch(action.type) {
    case 'SET_DRIVE_DIRS': 
      return {...state, targets: action.payload, defaultDirId: action.payload[0].id}
      break
    case 'SET_DRIVE_DEFAULT_DIR':
      return {...state, defaultDirId: action.payload}
      break
    case 'SET_DRIVE_TARGET_DIR_CONTENTS':
      return {...state, targetContents: new Set(action.payload)}
      break
    default:
      return state
  }
}


const thumbs = (state = {
  fileNames: new Set(),
  dir: '',
  devEnv: false
}, action) => {
  switch(action.type) {
    case 'SET_THUMBS_SOURCE_DIR':
      return {...state, dir: action.payload.dir, devEnv: action.payload.devEnv}
      break
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
  jpgs: [],
  mainImgPath: '',
}, action) => {
  switch(action.type) {
    case 'SET_SOURCE_JPGS':
      return {...state, jpgs: action.payload}
      break
    case 'SET_MAIN_IMG':
    console.log('mip', action.payload)
      return {...state, mainImgPath: action.payload}
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
  diskDirs,
  driveDirs,
  sourceContents,
  thumbs,
  filesToSync,
})

export default philter