import { combineReducers } from 'redux'
import {
  addFileName,
  resolveThumbsSourceDir,
  stageDirToSync,
  // toggleStaged,
  // addTargetDir,
} from './util'

const diskDirs = (state = {
  source: '',
  targets: [],
  targetContents: new Set(),
}, action) => {
  switch(action.type) {
    case 'SET_SOURCE_DIR':
      return {...state, source: action.payload}
      break
    case 'ADD_TARGET_DIRS':
      return {...state, targets: action.payload}
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
  mainImg: '',
}, action) => {
  switch(action.type) {
    case 'SET_SOURCE_JPGS':
      return {...state, jpgs: action.payload}
      break
    case 'SET_MAIN_IMG':
      return {...state, mainImg: action.payload}
      break
    default:
      return state
  }
}

const filesToSync = (state = {
  drive: {},
  disk: {},
}, action) => {
  switch(action.type) {
    case 'STAGE_DRIVE_DIR_TO_SYNC':
      return {...state, drive: stageDirToSync(state.drive, action.payload)}
      break
    case 'STAGE_DISK_DIR_TO_SYNC':
      return {...state, disk: stageDirToSync(state.disk, action.payload)}
      break
    default:
      return state  
  }
}

export default combineReducers({
  diskDirs,
  driveDirs,
  sourceContents,
  thumbs,
  filesToSync,
})

