import React from 'react'
import ImgNavItems from '../components/ImgNavItems'
import { connect } from 'react-redux'
import {
  setMainImg
} from '../nodeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    sourceJpgs: state.sourceContents.jpgs,
    thumbFileNames: state.thumbs.fileNames,
    diskTargetContents: state.diskDirs.targetContents,
    driveTargetContents: state.driveDirs.targetContents,
    sourceDir: state.diskDirs.source,
    thumbsSourceDir: state.thumbs.dir,
    devEnv: state.thumbs.devEnv,
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

