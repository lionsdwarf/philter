import React, { Component } from 'react'
import ImgNav from './containers/ImgNav'
import Source from './containers/Source'
import Targets from './components/Targets'
import SyncControl from './containers/SyncControl'
import MainImg from './containers/MainImg'
import { initListeners } from './nodeListeners'
import { init } from './nodeActions'
import './styles/App.css'

const classesByRotation = {
  270: 'portrait portrait270',
  90: 'portrait portrait90',
}

export default class Philter extends Component {

  state = {}

  componentWillMount() {
    initListeners(this.props.dispatch)
    init()
  }

  _setRotation = rotation => {
    const rotationClasses = classesByRotation[rotation]
    this.setState(
      () => {
        return {
          containerClasses: rotationClasses
        }
      }
    )
  }

  render() {
    const searchParams = new URLSearchParams(window.location.search)
    console.log(searchParams.get('window'))
    console.log(this.props)
    return (
      <div className='Philter'>

        {

          searchParams.get('window') === 'mainImg' ? 
            <div className={`imgDisplay ${this.state.containerClasses}`}>
              <MainImg rotateContainer={ this._setRotation }/>
            </div>
            :
            <nav className='nav'>
              <Source/>
              <ImgNav/>
              <Targets/>
              <SyncControl/>
            </nav>
        }

        
      </div>
    );
  }
}
