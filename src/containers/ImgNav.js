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
    filesToSync: state.filesToSync,
    // diskTargetContents: state.diskDirs.targetContents,
    // driveTargetContents: state.driveDirs.targetContents,
    sourceDir: state.diskDirs.source,
    thumbsSourceDir: state.thumbs.dir,
    devEnv: state.thumbs.devEnv,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    unstageDir: (dirType, dir, fileName) => dispatch({
      type: `UNSTAGE_${dirType.toUpperCase()}_DIR`,
      payload: {
        fileName: fileName,
        dir: dir,
      }
    }),
    setMainImg: (sourceDir, fileName) => dispatch({
      type: 'SET_MAIN_IMG',
      payload: fileName
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgNavItems)

