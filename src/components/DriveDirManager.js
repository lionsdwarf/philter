import React, { Component } from 'react'
import CreateDriveDir from '../components/CreateDriveDir'
import DriveDirSelect from '../components/DriveDirSelect'
import {
  createDriveDir
} from '../nodeActions'

export default class DriveDirManager extends Component {

  state = {
    isCreate: false,
    createReqInTransit: false,
    driveDirName: '',
  }

  componentWillReceiveProps(nextProps) {
    this._updateReqInTransit(nextProps)
  }

  _updateReqInTransit = nextProps => {
    if(this.state.createReqInTransit && nextProps.targetDirs.length > this.props.targetDirs.length) {
      this.setState( prevState => {
        createReqInTransit: false
      })
    }
  }

  _toggleIsCreate = () => {
    this.setState( prevState  => {
      return { isCreate: !prevState.isCreate }
    })
  }

  _setDirName = e => {
    this.setState({
      driveDirName: e.target.value
    }) 
  }

  _createDriveDir = () => {
    createDriveDir(this.state.driveDirName)
    this.setState( prevState => {
      return {
        driveDirName: '',
        isCreate: false,
        createReqInTransit: true,
      }
    })
  }

  render() {
    return (
      <div>


        {
          this.state.isCreate ?
            <CreateDriveDir
              driveDirName={this.state.driveDirName}
              setDirName={this._setDirName}
              createDriveDir={this._createDriveDir}
            />
            :
            <div onClick={ this._toggleIsCreate }>+ Add new</div>
        }

        {
          this.state.createReqInTransit ?
            <div>Spinner</div>
            :
            <DriveDirSelect
              onChange={this.props.driveDefaultDirSelect}
              targetDirs={this.props.targetDirs}
            />
        }

      </div>
    )
  }
}        