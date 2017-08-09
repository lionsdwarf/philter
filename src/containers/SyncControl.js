import React from 'react'
import Sync from '../components/Sync'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  console.log('s',state)
  return {
    filesToSync: state.syncStage
  }
}

const SyncControl = connect(mapStateToProps)(Sync)

export default SyncControl