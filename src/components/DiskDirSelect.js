import React from 'react';
import {
  selectDir
} from '../nodeActions'

const DiskDirSelect = ({dirType, src}) => {
  return (
    <div>
      <img src={src} style={_s.img}/>
      <button onClick={ () => selectDir(dirType) }>{dirType + ' select'}</button>
    </div>
  )
}

export default DiskDirSelect

const _s = {
  img: {
    width: 80
  }
}