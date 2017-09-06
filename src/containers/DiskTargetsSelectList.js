import React from 'react'
import DiskTargetsSelectList from '../components/DiskTargetsSelectList'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    targets: state.diskDirs.targets,
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

