import React, { Component } from 'react';
import {
  createDriveDir
} from '../nodeActions'


class CreateDriveDir extends Component {

  setDirName = e => {
    this.setState({
      newDirName: e.target.value
    }) 
  }

  createDriveDir = () => {
    createDriveDir(this.state.newDirName)
  }

  render() {
    return  (
      <div>
        <input type='text' onChange={ this.setDirName }/>
        <button onClick={ this.createDriveDir }>Create Dir</button>
      </div>
    )
  }

}

export default CreateDriveDir