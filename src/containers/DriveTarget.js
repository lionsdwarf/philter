import React from 'react'
import { connect } from 'react-redux'
import DriveDirManager from '../components/DriveDirManager'
import {
  createDriveDir
} from '../nodeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    targetDirs: state.driveDirs.targets,
    createDriveDir: createDriveDir,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    driveDefaultDirSelect: dirId => dispatch({
      type: 'SET_DRIVE_DEFAULT_DIR',
      payload: dirId
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriveDirManager)

