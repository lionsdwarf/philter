import React, {Component} from 'react'
import SVGIcon from './SVGIcon'
import {
  arrow,
} from '../styles/svgPaths'
import '../styles/components/DirLabel.css'

const parseDir = fullDirPath => {
  return {
    path: fullDirPath.slice(0, fullDirPath.lastIndexOf('/')),
    dir: fullDirPath.slice(fullDirPath.lastIndexOf('/'), fullDirPath.length),
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
          style={{
            transform: 'rotate(' + (this.state.pathDisplay ? '270' : '90') + 'deg)',
          }}
          onClick={ this._togglePathDisplay }
          className='iconWrapper'
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