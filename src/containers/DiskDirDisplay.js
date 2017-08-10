import React from 'react'
import DiskDirDisplay from '../components/DiskDirDisplay'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    source: state.dirs.source,
    target: state.dirs.target
  }
}

const DirNavDisplay = connect(mapStateToProps)(DiskDirDisplay)

export default DirNavDisplay