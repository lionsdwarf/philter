import React, { Component } from 'react'
import CreateDriveDir from '../components/CreateDriveDir'
import DriveDirSelect from '../components/DriveDirSelect'
import SVGIcon from './SVGIcon'
import { googleDriveIcon } from '../styles/svgPaths'
import '../styles/components/DirSelect.css'

export default class DriveDirManager extends Component {

  state = {
    isCreate: false,
    postInTransit: false,
    driveDirName: '',
  }

  componentWillReceiveProps(nextProps) {
    this._updateReqInTransit(nextProps)
  }

  _updateReqInTransit = nextProps => {
    if(this.state.postInTransit && nextProps.targetDirs.length > this.props.targetDirs.length) {
      this.setState( prevState => {
        postInTransit: false
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
    this.props.createDriveDir(this.state.driveDirName)
    this.setState( prevState => {
      return {
        driveDirName: '',
        isCreate: false,
        postInTransit: true,
      }
    })
  }

  render() {
    return (
      <div className='dirSelect'>

        <div>
          <SVGIcon 
            paths={googleDriveIcon}
            fill='hotpink'
          />
        </div>

        {
          this.state.isCreate ?
            <CreateDriveDir
              driveDirName={this.state.driveDirName}
              setDirName={this._setDirName}
              createDriveDir={this._createDriveDir}
              toggleIsCreate={this._toggleIsCreate}
            />
            :
            <div onClick={this._toggleIsCreate}>+ Create directory</div>
        }

        {
          this.state.postInTransit ?
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