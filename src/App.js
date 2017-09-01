import React, { Component } from 'react'
import ImgNav from './containers/ImgNav'
import DiskSource from './containers/DiskSource'
import Targets from './components/Targets'
import SyncControl from './containers/SyncControl'
import MainImg from './containers/MainImg'
import {
  initListeners,
} from './nodeListeners'
import {
  init
} from './nodeActions'

class Philter extends Component {

  componentWillMount() {
    initListeners(this.props.dispatch)
    init()
  }

  render() {
    return (
      <div style={_s}>

        <DiskSource/>

        <Targets/>

        <SyncControl/>

        <ImgNav/>

        <MainImg/>
        
      </div>
    );
  }
}

export default Philter

const _s = {
  'font-family': 'arial',
  'font-weight': 100,
  color: 'grey'
}
