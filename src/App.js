import React, { Component } from 'react'
import ImgNav from './containers/ImgNav'
import Source from './containers/Source'
import Targets from './components/Targets'
import SyncControl from './containers/SyncControl'
import MainImg from './containers/MainImg'
import DiskTargetsSelectList from './containers/DiskTargetsSelectList'
import { initListeners } from './nodeListeners'
import { init } from './nodeActions'

export default class Philter extends Component {

  componentWillMount() {
    initListeners(this.props.dispatch)
    init()
  }

  render() {
    return (
      <div style={_s}>

        <Source/>

        <Targets/>

        <SyncControl/>

        <ImgNav/>

        <DiskTargetsSelectList/>

        <MainImg/>
        
      </div>
    );
  }
}

const _s = {
  'font-family': 'arial',
  'font-weight': 100,
  color: 'grey'
}
