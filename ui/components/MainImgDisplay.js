import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../styles/components/MainImgDisplay.css'

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

export default class MainImgDisplay extends Component {

  state = {}

  componentDidMount() {
    this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
  }

  componentWillReceiveProps(props) {
    console.log(props)
    this.props.mainImg !== props.mainImg && this._setMainImg(props.mainImg)
  }

  _setMainImg = mainImg => {
    this.src = `${this.props.sourceDir}/${mainImg}`
    this._setImg(mainImg)
  }

  _setImg = mainImg => {
    const jpgMetadata = this.props.jpgsMetadata[mainImg]
    this.isLandscapeLayout = jpgMetadata && (jpgMetadata.orientation === 1 || jpgMetadata.orientation === 3)
    const style = {
      backgroundImage: `url('file://${this.src}')`,
    }
    jpgMetadata && jpgMetadata.orientation && this.props.rotateContainer(getRotation(jpgMetadata.orientation))
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
    return this.isLandscapeLayout ?
      ((e.pageX - this.rect.left) / this.rect.width) * 100 + '% ' + ((e.pageY - this.rect.top) / this.rect.height) * 100 +'%'
      :
      (100 - ((e.pageY - this.rect.top) / this.rect.height) * 100) +'% ' + ((e.pageX - this.rect.left) / this.rect.width) * 100 + '%'
  }

  _zoomPan = e => {
    const style = {
      backgroundImage: `url('file://${this.src}')`,
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

