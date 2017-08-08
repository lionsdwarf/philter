import React from 'react'
import ImgControlList from '../components/ImgControlList'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    // sourceDir: state.dirs.source,
    sourceJpgs: state.sourceContents.jpgs,
    thumbsDir: state.thumbs.dir,
    thumbFileNames: state.thumbs.fileNames,
  }
}

const ImgNav = connect(mapStateToProps)(ImgControlList)

export default ImgNav