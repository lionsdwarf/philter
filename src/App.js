import React, { Component } from 'react'
import ImgNav from './containers/ImgNav'
import DiskDirDisplay from './containers/DiskDirDisplay'
import SyncControl from './containers/SyncControl'
import DriveDirManager from './containers/DriveDirManager'
import DiskDirSelect from './components/DiskDirSelect'
import CreateDriveDir from './components/CreateDriveDir'
import {
  configureListeners
} from './nodeListeners'
import {
  authDrive
} from './nodeActions'
class Philter extends Component {

  componentWillMount() {
    configureListeners(this.props.dispatch)
    authDrive()
  }

  render() {
    return (
      <div>
        <SyncControl/>

        <DiskDirDisplay/>
        <DiskDirSelect type='source'/>
        <DiskDirSelect type='target'/>
        <DriveDirManager/>
        <CreateDriveDir/>

        <ImgNav/>

      </div>
    );
  }
}

export default Philter
