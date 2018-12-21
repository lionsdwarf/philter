import { combineReducers } from 'redux'
import {
  addFileName,
  stageDirToSync,
  unstageDir,
  addJpgMetadata,
  addTargetDirContents,
  addWriteStatus,
} from './util'

const diskDirs = (state = {
  source: '',
  targets: [],
  targetContents: {},
}, action) => {
  switch(action.type) {
    case 'SET_SOURCE_DIR':
      return {...state, source: action.payload}
    case 'ADD_TARGET_DIRS':
      return {...state, targets: action.payload}
    case 'SET_DISK_TARGET_DIR_CONTENTS':
      return {...state, targetContents: addTargetDirContents(state.targetContents, action.payload)}
    default:
      return state
  }
}

const writeStatus = (state = {
  diskSuccesses: {},
  diskErrors: {},
  driveSuccesses: {},
  driveErrors: {},
}, action) => {
  switch(action.type) {
    case 'SET_DISK_WRITE_SUCCESS':
      return {...state, diskSuccesses: addWriteStatus(state.diskSuccesses, action.payload)}
    case 'SET_DISK_WRITE_ERROR':
      return {...state, diskErrors: addWriteStatus(state.diskErrors, action.payload)}
    case 'SET_DRIVE_WRITE_SUCCESS':
      return {...state, driveSuccesses: addWriteStatus(state.driveSuccesses, action.payload)}
    case 'SET_DRIVE_WRITE_ERROR':
      return {...state, driveErrors: addWriteStatus(state.driveErrors, action.payload)}
    default:
      return state
  }
}

const driveDirs = (state = {
  targets: [],
  targetContents: {},
}, action) => {
  switch(action.type) {
    case 'SET_DRIVE_DIRS': 
      return {...state, targets: action.payload}
    case 'SET_DRIVE_TARGET_DIR_CONTENTS':
      return {...state, targetContents: addTargetDirContents(state.targetContents, action.payload)}
    default:
      return state
  }
}


const thumbs = (state = {
  fileNames: new Set(),
}, action) => {
  switch(action.type) {
    case 'SET_THUMB':
      return {...state, fileNames: addFileName(state.fileNames, action.payload.fileName)}
    default:
      return state
  }
}

const sourceContents = (state = {
  jpgs: [],
  jpgsMetadata: {},
  mainImg: '',
}, action) => {
  switch(action.type) {
    case 'SET_SOURCE_JPGS':
      return {...state, jpgs: action.payload}
    case 'SET_MAIN_IMG':
      return {...state, mainImg: action.payload}
    case 'SET_JPG_METADATA':
      return {...state, jpgsMetadata: addJpgMetadata(state.jpgsMetadata, action.payload)}
    default:
      return state
  }
}

const filesToSync = (state = {
  drive: {},
  disk: {},
}, action) => {
  switch(action.type) {
    case 'STAGE_DISK_DIR_FOR_SYNC':
      return {...state, disk: stageDirToSync(state.disk, action.payload)}
    case 'STAGE_DRIVE_DIR_FOR_SYNC':
      return {...state, drive: stageDirToSync(state.drive, action.payload)}
    case 'UNSTAGE_DISK_DIR':
      return {...state, disk: unstageDir(state.disk, action.payload)}
    case 'UNSTAGE_DRIVE_DIR':
      return {...state, drive: unstageDir(state.drive, action.payload)}
    default:
      return state  
  }
}

export default combineReducers({
  diskDirs,
  writeStatus,
  driveDirs,
  sourceContents,
  thumbs,
  filesToSync,
})

