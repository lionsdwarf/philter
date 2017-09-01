import React from 'react'
import DiskTarget from '../components/DiskTarget'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    targetDir: state.diskDirs.target,
  }
}

export default connect(mapStateToProps)(DiskTarget)

