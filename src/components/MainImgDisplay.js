import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../styles/components/MainImgDisplay.css'
import { 
  MAIN_IMG_CONTAINER_HEIGHT,
  MAIN_IMG_CONTAINER_WIDTH,
} from '../App'

const getRotation = orientation => {
  switch (orientation) {
    case 3:
      return '180'
    case 6:
      return '90'
    case 8:
      return '270'
    default:
      return '0'
  }
}

// const getLandscapeDimensions = metadata => {
//   const aspectRatio = metadata.width / metadata.height
//   const width = MAIN_IMG_CONTAINER_HEIGHT * aspectRatio
//   return {
//     height: `${parseInt(MAIN_IMG_CONTAINER_HEIGHT)}px`,
//     width: `${parseInt(width)}px`,
//   }
// }

// const getPortraitDimensions = metadata => {
//   const aspectRatio = metadata.width / metadata.height
//   const width = MAIN_IMG_CONTAINER_HEIGHT
//   const height = width / aspectRatio
//   return {
//     height: `${parseInt(height)}px`,
//     width: `${parseInt(width)}px`,
//   }
// }

export default class MainImgDisplay extends Component {

  state = {}

  componentDidMount() {
    this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
  }

  componentWillReceiveProps(props) {
    this.props.mainImg !== props.mainImg && this._setMainImg(props.mainImg)
  }

  _setMainImg = mainImg => {
    if (this.props.devEnv) {
      // getRotation(this.props.jpgsMetadata[mainImg].orientation) === '0' ?
        this.src = require('../devPublic/P6102532.JPG')
        // :
        // this.src = require('../devPublic/P7100344.JPG')
    } else {
      this.src = `${this.props.sourceDir}/${mainImg}`
    }
    this._setImg(mainImg)
  }

  _setImg = mainImg => {
    const jpgMetadata = this.props.jpgsMetadata[mainImg]
    const isLandscape = jpgMetadata.orientation === 1 || jpgMetadata.orientation === 3
    // const layoutDimensions = isLandscape ? getLandscapeDimensions(jpgMetadata) : getPortraitDimensions(jpgMetadata)

    const style = {
      backgroundImage: `url('${this.src}')`,
    }
    // const containerStyle = {
    //   // ...layoutDimensions,
    //   // transform: `rotate(${ getRotation(jpgMetadata.orientation) }deg) translate(-12%, -12%)`,
    //   // marginTop: isLandscape ? '10px' : '80px',
    // }
    
    // this.state.containerStyle !== containerStyle && !isLandscape && this._setContainerStyle(containerStyle)
    this.props.rotateContainer(getRotation(jpgMetadata.orientation))
    this._setImgStyle(style)
  }

  _setImgStyle = style => {
    this.setState(
      () => {
        return {style: style}
      }
    )
  }

  _setContainerStyle = style => {
    this.setState(
      () => {
        return {containerStyle: style}
      }
    )
  }

  _calcOriginTransformation = e => {
    return ((e.pageX - this.rect.left) / this.rect.width) * 100 + '% ' + ((e.pageY - this.rect.top) / this.rect.height) * 100 +'%'
  }

  _zoomPan = e => {
    const style = {
      backgroundImage: `url('${this.src}')`,
      transformOrigin: this._calcOriginTransformation(e),
    }
    this._setImgStyle(style)
  }

  render() {
    return (
      <div className='MainImgDisplay' style={this.state.containerStyle}>
        <div 
          onMouseMove={ this._zoomPan }
          className={'mainImg'}
          style={this.state.style}>
        </div>
      </div>
    )
  }
}

