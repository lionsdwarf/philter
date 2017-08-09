import React, { Component } from 'react'
import ImgNav from './containers/ImgNav'
import DirDisplay from './containers/DirDisplay'
import SyncControl from './containers/SyncControl'
import DirSelect from './components/dirSelect'
import {
  configureListeners
} from './nodeListeners'

class Philter extends Component {

  componentWillMount() {
    configureListeners(this.props.dispatch)
  }

  render() {
    return (
      <div>
        <SyncControl/>
        <DirDisplay/>
        <DirSelect type='source'/>
        <DirSelect type='target'/>
        <ImgNav/>

      </div>
    );
  }
}

export default Philter
