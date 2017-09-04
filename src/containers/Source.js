import React from 'react'
import Source from '../components/Source'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    sourceDir: state.diskDirs.source,
  }
}

export default connect(mapStateToProps)(Source)

