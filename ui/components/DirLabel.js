import React, {Component} from 'react'
import '../styles/components/DirLabel.css'
import carat from '../static/svg/carat.svg'

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
          <img src={`./${carat}`} alt='carat'/>
        </div>
        
        <span>{ this.state.pathDisplay ? this.dirPath : '' }</span>

        <span>{this.dir}</span>

      </div>
    )
  }
}