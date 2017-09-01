import React from 'react'
import MainImgDisplay from '../components/MainImgDisplay'
import { connect } from 'react-redux'
import { setMainImg } from '../nodeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    mainImgPath: state.sourceContents.mainImgPath,
    devEnv: state.thumbs.devEnv,
  }
}

const MainImg = connect(mapStateToProps)(MainImgDisplay)

export default MainImg