import React from 'react'
import ImgControlList from '../components/ImgControlList'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    sourceJpgs: state.sourceContents.jpgs,
    thumbFileNames: state.thumbs.fileNames,
  }
}

const ImgNav = connect(mapStateToProps)(ImgControlList)

export default ImgNav