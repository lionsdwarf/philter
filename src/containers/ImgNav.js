import React from 'react'
import ImgNavItems from '../components/ImgNavItems'
import { connect } from 'react-redux'
import {
  setMainImg
} from '../nodeActions'

const getDriveDirName = (targetDirs, dirId) => {
  for (let dir of targetDirs) {
    if (dir.id === dirId) {
      return dir.name
    }
  }
}

const parseDiskTargetDir = dir => dir.slice(dir.lastIndexOf('/') + 1, dir.length)

const mapStateToProps = (state, ownProps) => {
  console.log(parseDiskTargetDir(state.diskDirs.target))
  console.log(getDriveDirName(state.driveDirs.targets, state.driveDirs.defaultDirId))
  return {
    sourceJpgs: state.sourceContents.jpgs,
    thumbFileNames: state.thumbs.fileNames,
    diskTargetContents: state.diskDirs.targetContents,
    driveTargetContents: state.driveDirs.targetContents,
    sourceDir: state.diskDirs.source,
    diskTargetDir: parseDiskTargetDir(state.diskDirs.target),
    thumbsSourceDir: state.thumbs.dir,
    devEnv: state.thumbs.devEnv,
    driveTargetDir: getDriveDirName(state.driveDirs.targets, state.driveDirs.defaultDirId),
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    toggleSync: (fileName, bool, syncType) => dispatch({
      type: 'TOGGLE_' + syncType.toUpperCase() + '_SYNC',
      toStage: bool,
      payload: fileName
    }),
    setMainImg: (sourceDir, fileName) => dispatch({
      type: 'SET_MAIN_IMG',
      payload: `${sourceDir}/${fileName}`
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgNavItems)

