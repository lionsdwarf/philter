import React, { Component } from 'react'
import ImgNav from './containers/ImgNav'
import Source from './containers/Source'
import Targets from './components/Targets'
import SyncControl from './containers/SyncControl'
import MainImg from './containers/MainImg'
import { initListeners } from './nodeListeners'
import { init } from './nodeActions'
import './styles/App.css'

export const MAIN_IMG_CONTAINER_HEIGHT = 575

export default class Philter extends Component {

  componentWillMount() {
    initListeners(this.props.dispatch)
    init()
  }

  render() {
    return (
      <div className='Philter'>

        <nav className='nav'>

          <Source/>

          <ImgNav/>
          
          <Targets/>

        </nav>

        <div className='imgDisplay' style={{height: `${MAIN_IMG_CONTAINER_HEIGHT}px`}}>

          <MainImg/>

        </div>

        <SyncControl/>
        
      </div>
    );
  }
}
