import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../styles/components/MainImgDisplay.css'

// const DIFF = 80

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
      this.src = require('../devPublic/PB060521.JPG')
    } else {
      this.src = `${this.props.sourceDir}/${mainImg}`
    }
    this._setImg()
  }

  _setImg = () => {
    const style = {
      'backgroundImage': `url('${this.src}')`,
    }
    this._setImgStyle(style)
  }

  _setImgStyle = style => {
    this.setState(
      () => {
        return {style: style}
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
      <div className='MainImgDisplay'>
        <div 
          onMouseMove={ this._zoomPan }
          className={'mainImg'}
          style={this.state.style}>
        </div>
      </div>
    )
  }
}

