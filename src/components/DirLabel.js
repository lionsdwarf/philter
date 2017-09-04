import React, {Component} from 'react'
import SVGIcon from './SVGIcon'
import {
  arrow,
} from '../styles/svgPaths'
import '../styles/components/DirLabel.css'

const parseDir = fullDirPath => {
  return {
    path: fullDirPath.slice(0, fullDirPath.lastIndexOf('/') + 1),
    dir: fullDirPath.slice(fullDirPath.lastIndexOf('/') + 1, fullDirPath.length),
  }
}

export default class DirLabel extends Component {

  state = {
    pathDisplay: false
  }

  componentWillMount() {
    const parsedDir = parseDir(this.props.dir)
    this.dir = parsedDir.dir
    this.dirPath = parsedDir.path
  }

  _togglePathDisplay = () => {
    this.setState( prevState => {
      return {
        pathDisplay: !prevState.pathDisplay
      }
    })
  }

  render() {
    return (
      <div className='DirLabel'>

        <div 
          onClick={ this._togglePathDisplay }
          className={`iconWrapper ${this.state.pathDisplay ? 'rotate270' : 'rotate90'}`}
        >
          <SVGIcon
            paths={arrow}
            width={20}
            height={20}
          />
        </div>
        
        <span>{ this.state.pathDisplay ? this.dirPath : '' }</span>

        <span>{this.dir}</span>

      </div>
    )
  }
}