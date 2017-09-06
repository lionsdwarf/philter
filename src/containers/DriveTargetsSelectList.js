import React from 'react'
import DriveTargetsSelectList from '../components/DriveTargetsSelectList'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  console.log('s', state.filesToSync)
  return {
    targets: state.driveDirs.targets,
    filesToSync: state.filesToSync.drive,
    mainImg: state.sourceContents.mainImg,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    stageDirToSync: (img, dir) => dispatch({
      type: 'STAGE_DRIVE_DIR_TO_SYNC',
      payload: {
        dir: dir,
        img: img,
      }
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriveTargetsSelectList)

