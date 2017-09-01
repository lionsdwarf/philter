import React from 'react'
import DiskSource from '../components/DiskSource'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    sourceDir: state.diskDirs.source,
  }
}

export default connect(mapStateToProps)(DiskSource)

