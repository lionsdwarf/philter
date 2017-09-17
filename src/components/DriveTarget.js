import React, { Component } from 'react'
import CreateDriveDir from '../components/CreateDriveDir'
import DriveDirsList from '../components/DriveDirsList'
import DriveTargetsSelectList from '../containers/DriveTargetsSelectList'
import googleDrive from '../static/svg/googleDrive.svg'
import carat from '../static/svg/carat.svg'
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
    if (this.state.postInTransit && nextProps.targetDirs.length > this.props.targetDirs.length) {
      this.setState( prevState => {
        return { postInTransit: false }
      })
    }
  }

  _toggleIsCreate = () => {
    this.setState( prevState  => {
      return { createDir: !prevState.createDir }
    })
  }

  _setDirName = e => {
    e.persist()
    this.setState( prevState => {
      return { driveDirName: e.target.value }
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

        <img src={googleDrive} alt='google drive'/>

        {
          this.state.postInTransit ?
            <div>Spinner</div>
            :
            <div>
              <div 
                onClick={this._toggleIsCreate}
                className={`iconWrapper ${this.state.createDir ? 'rotate180' : ''}`}
              >
                <img src={carat} alt='carat'/>
              </div>
              <span onClick={this._toggleIsCreate}>Add directory</span>
            </div>
        }
        
        {
          this.state.createDir && <CreateDriveDir
            driveDirName={this.state.driveDirName}
            setDirName={this._setDirName}
            createDriveDir={this._createDriveDir}
            toggleIsCreate={this._toggleIsCreate}
          />
        }

        {
          this.props.mainImg ?
            <DriveTargetsSelectList/>
            :
            <DriveDirsList
              targetDirs={this.props.targetDirs}
            />
        }

      </div>
    )
  }
}        