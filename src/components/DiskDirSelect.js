import React from 'react';
import {
  selectDir
} from '../nodeActions'

const DiskDirSelect = props => {
  return (
    <div>
      <button onClick={ () => selectDir(props.type) }>{props.type + ' select'}</button>
    </div>
  )
}

export default DiskDirSelect