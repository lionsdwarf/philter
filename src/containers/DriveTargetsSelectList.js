import React from 'react'
import DriveTargetsSelectList from '../components/DriveTargetsSelectList'
import { connect } from 'react-redux'

const getUnstagedTargets = (targets, stagedFiles, mainImg) => {
  const stagedTargets = stagedFiles[mainImg]
  return stagedTargets ?
    targets.filter(
      target => !stagedTargets.has(target.id)
    )
    :
    targets
}

const mapStateToProps = (state, ownProps) => {
  return {
    unstagedTargets: getUnstagedTargets(state.driveDirs.targets, state.filesToSync.drive, state.sourceContents.mainImg),
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

