import React from 'react'
import ImgNavItems from '../components/ImgNavItems'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    sourceJpgs: state.sourceContents.jpgs,
    thumbMappings: state.thumbs.mappings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSync: (fileName, bool, syncType) => dispatch({
      type: 'TOGGLE_' + syncType.toUpperCase() + '_SYNC',
      toStage: bool,
      payload: fileName
    })
  }
}

const ImgNav = connect(mapStateToProps, mapDispatchToProps)(ImgNavItems)

export default ImgNav