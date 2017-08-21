import React from 'react'
import { connect } from 'react-redux'
import DriveDirSelect from '../components/DriveDirSelect'

const mapStateToProps = (state, ownProps) => {
  return {
    dirs: state.driveDirs.targets,
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

const DriveDirManager = connect(mapStateToProps, mapDispatchToProps)(DriveDirSelect)

export default DriveDirManager