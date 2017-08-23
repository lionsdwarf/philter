import React from 'react'
import { connect } from 'react-redux'
import DriveDirManager from '../components/DriveDirManager'

const mapStateToProps = (state, ownProps) => {
  return {
    targetDirs: state.driveDirs.targets,
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

