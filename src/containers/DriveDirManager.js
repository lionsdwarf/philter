import React from 'react'
import { connect } from 'react-redux'
import DriveDirSelect from '../components/DriveDirSelect'

const mapStateToProps = (state, ownProps) => {
  return {
    dirs: state.dirs.drive,
  }
}

const DriveDirManager = connect(mapStateToProps)(DriveDirSelect)

export default DriveDirManager