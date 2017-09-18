import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../styles/components/MainImgDisplay.css'

// const DIFF = 80

const rotateByOrientation = orientation => {
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

export default class MainImgDisplay extends Component {

  state = {}

  componentDidMount() {
    this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
  }

  componentWillReceiveProps(props) {
    console.log(this.rect)
    this.props.mainImg !== props.mainImg && this._setMainImg(props.mainImg)
  }

  _setMainImg = mainImg => {
    if (this.props.devEnv) {
      this.src = require('../devPublic/PB060521.JPG')
    } else {
      this.src = `${this.props.sourceDir}/${mainImg}`
    }
    this._setImg(mainImg)
  }

  _setImg = mainImg => {
    const style = {
      'backgroundImage': `url('${this.src}')`,
    }
    const containerStyle = {
      'transform': `rotate(${ rotateByOrientation(this.props.jpgOrientations[mainImg]) }deg)`,
    }
    this._setContainerStyle(containerStyle)
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
      'backgroundImage': `url('${this.src}')`,
      'transformOrigin': this._calcOriginTransformation(e),
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

