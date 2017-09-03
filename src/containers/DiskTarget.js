import React from 'react'
import DiskTarget from '../components/DiskTarget'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    targets: state.diskDirs.targets,
  }
}

export default connect(mapStateToProps)(DiskTarget)

