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

export default connect(mapStateToProps)(DriveDirManager)

