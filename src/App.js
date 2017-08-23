import React, { Component } from 'react'
import ImgNav from './containers/ImgNav'
import DiskDirManager from './containers/DiskDirManager'
import SyncControl from './containers/SyncControl'
import MainImgDisplay from './containers/MainImgDisplay'
import DriveDirManager from './containers/DriveDirManager'
import {
  initListeners,
} from './nodeListeners'
import {
  init
} from './nodeActions'

class Philter extends Component {

  componentWillMount() {
    initListeners(this.props.dispatch)
    init()
  }

  render() {
    return (
      <div>

        <MainImgDisplay/>


        <DiskDirManager/>
        
        <DriveDirManager/>        
        
        <SyncControl/>

        <ImgNav/>

      </div>
    );
  }
}

export default Philter
