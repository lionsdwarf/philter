import React from 'react'
import DiskTargetsSelectList from '../components/DiskTargetsSelectList'
import { connect } from 'react-redux'

const getUnstagedTargets = (targets, stagedFiles, mainImg) => {
  const stagedTargets = stagedFiles[mainImg]
  return stagedTargets ?
    targets.filter(
      target => !stagedTargets.has(target)
    )
    :
    targets
}

const mapStateToProps = (state, ownProps) => {
  return {
    targets: state.diskDirs.targets,
    unstagedTargets: getUnstagedTargets(state.diskDirs.targets, state.filesToSync.disk, state.sourceContents.mainImg),
    filesToSync: state.filesToSync.disk,
    mainImg: state.sourceContents.mainImg,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    stageDirToSync: (img, dir) => dispatch({
      type: 'STAGE_DISK_DIR_TO_SYNC',
      payload: {
        dir: dir,
        img: img,
      }
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskTargetsSelectList)

