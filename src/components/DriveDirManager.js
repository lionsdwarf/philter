import React, { Component } from 'react'
import CreateDriveDir from '../components/CreateDriveDir'
import DriveDirSelect from '../components/DriveDirSelect'
import SVGIcon from './SVGIcon'
import { googleDriveIcon, caratIcon } from '../styles/svgPaths'
import '../styles/components/DirSelect.css'
import '../styles/components/DirLabel.css'

export default class DriveDirManager extends Component {

  state = {
    createDir: false,
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
      return { createDir: !prevState.createDir }
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
        createDir: false,
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

        <div 
          onClick={this._toggleIsCreate}
          className={`iconWrapper ${this.state.createDir ? 'rotate180' : ''}`}
        >
          <SVGIcon
            paths={caratIcon}
            fill='black'
            width='20'
            height='20'
          />
        </div>
        <span onClick={this._toggleIsCreate}>+ Create directory</span>
        
        {
          this.state.createDir && <CreateDriveDir
            driveDirName={this.state.driveDirName}
            setDirName={this._setDirName}
            createDriveDir={this._createDriveDir}
            toggleIsCreate={this._toggleIsCreate}
          />
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