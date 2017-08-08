import React from 'react';
import {
  selectDir
} from '../nodeActions'

const DirSelect = props => {
  return (
    <div>
      <button onClick={ () => selectDir(props.type) }>{props.type + ' select'}</button>
    </div>
  )
}

export default DirSelect