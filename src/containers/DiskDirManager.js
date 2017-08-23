import React from 'react'
import DiskDirManager from '../components/DiskDirManager'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    sourceDir: state.diskDirs.source,
    targetDir: state.diskDirs.target
  }
}

export default connect(mapStateToProps)(DiskDirManager)

