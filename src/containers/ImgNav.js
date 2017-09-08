import React from 'react'
import ImgNavItems from '../components/ImgNavItems'
import { connect } from 'react-redux'
import {
  setMainImg
} from '../nodeActions'

// const getDriveDirName = (targetDirs, dirId) => {
//   for (let dir of targetDirs) {
//     if (dir.id === dirId) {
//       return dir.name
//     }
//   }
// }

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
    // driveTargetDirName: getDriveDirName(state.driveDirs.targets, state.driveDirs.defaultDirId),
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    // unstageDir: () => dispatch({
    //   type: '',
    //   payload: fileName
    // }),
    setMainImg: (sourceDir, fileName) => dispatch({
      type: 'SET_MAIN_IMG',
      payload: fileName
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgNavItems)

