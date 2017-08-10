import React from 'react'
import Sync from '../components/Sync'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    filesToSync: state.filesToSync,
    driveDefaultDirId: state.dirs.driveDefaultDirId
  }
}

const SyncControl = connect(mapStateToProps)(Sync)

export default SyncControl