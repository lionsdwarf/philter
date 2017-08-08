import React from 'react'
import DirDisplay from '../components/dirDisplay'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    source: state.dirs.source,
    target: state.dirs.target
  }
}

const DirNavDisplay = connect(mapStateToProps)(DirDisplay)

export default DirNavDisplay