import React, { Component } from 'react'
import ImgNav from './containers/ImgNav'
import Source from './containers/Source'
import Targets from './components/Targets'
import SyncControl from './containers/SyncControl'
import MainImg from './containers/MainImg'
import { initListeners } from './nodeListeners'
import { init } from './nodeActions'
import './styles/App.css'

export default class Philter extends Component {

  componentWillMount() {
    initListeners(this.props.dispatch)
    init()
  }

  render() {
    return (
      <div className='Philter'>

        <Source/>

        <Targets/>

        <ImgNav/>

        <MainImg/>

        <SyncControl/>
        
      </div>
    );
  }
}
