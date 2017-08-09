import { combineReducers } from 'redux'
import {
  addFileName,
} from './util'

const dirs = (state = {
  source: '',
  target: '',
  // app: '',
}, action) => {
  switch(action.type) {
    case 'SET_SOURCE_DIR':
      return {...state, source: action.payload}
      break
    case 'SET_TARGET_DIR':
      return {...state, target: action.payload}
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

const philter = combineReducers({
  dirs,
  thumbs,
  sourceContents,
})

export default philter