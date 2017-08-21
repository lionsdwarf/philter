import React from 'react'
import DiskDirDisplay from '../components/DiskDirDisplay'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    source: state.diskDirs.source,
    target: state.diskDirs.target
  }
}

const DirNavDisplay = connect(mapStateToProps)(DiskDirDisplay)

export default DirNavDisplay