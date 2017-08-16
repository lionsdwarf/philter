import React, { Component } from 'react';
import {
  createDriveDir
} from '../nodeActions'


class CreateDriveDir extends Component {

  setDirName = e => {
    this.setState({
      driveDirName: e.target.value
    }) 
  }

  createDriveDir = () => {
    createDriveDir(this.state.driveDirName)
    this.setState({
      driveDirName: ''
    }) 
  }

  render() {
    return  (
      <div>
        <input type='text' value={ this.state && this.state.driveDirName } onChange={ this.setDirName }/>
        <button onClick={ this.createDriveDir }>Create Dir</button>
      </div>
    )
  }

}

export default CreateDriveDir