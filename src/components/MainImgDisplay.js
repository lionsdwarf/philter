import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../styles/components/MainImgDisplay.css'
import objectAssign from 'object-assign'

// const standardStyle = {
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   'background-repeat': 'no-repeat',
//   'background-position': 'center',
//   'background-size': 'cover',
//   transition: 'transform .5s ease-out',
// }
// export default ({sourceDir, mainImg, devEnv}) => {
export default class MainImgDisplay extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    // style: standardStyle
  }

  componentDidMount() {
    this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    console.log('r',this.rect)
  }

  componentWillReceiveProps(props) {
    !this.props.mainImg && props.mainImg && this._setMainImg(props.mainImg)
  }

  _setMainImg = mainImg => {
    if (this.props.devEnv) {
      this.src = require('../devPublic/PB060521.JPG')
    } else {
      this.src = `${this.props.sourceDir}/${mainImg}`
    }
    this._setImg()
  }

  _setImgStyle = style => {
    this.setState(
      () => {
        return {style: style}
      }
    )
  }

  // _onMouseEnter = () => {
  //   const style = {
  //     ...newStyle,
  //     transform: 'scale(4)',
  //   }
  //   this._setImgStyle(style)
  // }

  _setHoverImgStyle = e => {
    const originTransformation = (e.pageX - this.rect.left / this.rect.width) * 100 + '% ' + ((e.pageY - this.rect.top) / this.rect.height) * 100 +'%'
                                  // (e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
    const style = {
      'background-image': `url('${this.src}')`,
      'transform-origin': originTransformation,
    }
  
    this._setImgStyle(style)
  }

  _setImg = () => {
    const style = {
      'background-image': `url('${this.src}')`,
    }
    this._setImgStyle(style)

  }

  // _resetImgStyle = () => {
  //   console.log('_resetImgStyle')
  //   const style = {
  //     ...standardStyle,
  //     transform: 'scale(1)',
  //     'background-image': `url('${this.src}')`,
  //   }
  //   this._setImgStyle(style)
    
  // }

  render() {
    console.log(this.state)
    return (
      <div style={{
        height: '700px',
        width: '700px',
        position: 'relative',
        float: 'left',
        overflow: 'hidden',
      }}>

      <div 
        // onMouseEnter={ () => this.setState({hovering: true}) }
        // onMouseOut={ () => this.setState({hovering: false}) }
        onMouseMove={ this._setHoverImgStyle }
        className={'mainImg'}
        style={this.state.style}>
      </div>
        
      </div>
    )
  }
}

