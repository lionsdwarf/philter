import React, { Component } from 'react';
import {
  createDriveDir
} from '../nodeActions'


class CreateDriveDir extends Component {

  state = {
    isCreate: false
  }

  setDirName = e => {
    this.setState({
      driveDirName: e.target.value
    }) 
  }

  createDriveDir = () => {
    createDriveDir(this.state.driveDirName)
    this.setState( prevState => {
      return {
        driveDirName: '',
        isCreate: !prevState.isCreate
      }
    })
  }

  toggleIsCreate = () => {
    this.setState( prevState  => {
      return { isCreate: !prevState.isCreate }
    })
  }

  render() {
    return  (
      <div>
        {
          this.state.isCreate ? 
            <div>
              <input type='text' value={ this.state && this.state.driveDirName || '' } onChange={ this.setDirName }/>
              <button disabled={!this.state || !this.state.driveDirName} onClick={ this.createDriveDir }>Create Dir</button>
            </div>
            :
            <div onClick={ this.toggleIsCreate }>+ Add new</div>
        }
      </div>
    )
  }

}

export default CreateDriveDir