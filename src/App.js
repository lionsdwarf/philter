import React, { Component } from 'react'
import ImgNav from './containers/ImgNav'
import DiskDirDisplay from './containers/DiskDirDisplay'
import SyncControl from './containers/SyncControl'
import DriveDirManager from './containers/DriveDirManager'
import MainImgDisplay from './containers/MainImgDisplay'
import DiskDirSelect from './components/DiskDirSelect'
import CreateDriveDir from './components/CreateDriveDir'
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

        <SyncControl/>

        <DiskDirDisplay/>

        <DiskDirSelect 
          src={require('./styles/icons/images.png')}
          dirType='source'/>
        <DiskDirSelect 
          src={require('./styles/icons/disk.png')}
          dirType='target'/>
        
        <DriveDirManager/>
        
        <CreateDriveDir/>

        <ImgNav/>

      </div>
    );
  }
}

export default Philter
