import React from 'react';
import DiskDirSelect from './DiskDirSelect'
import {
  selectDir
} from '../nodeActions'

export default ({sourceDir, targetDir}) => {
  return (
    <div style={_s}>
      
      <DiskDirSelect 
        dirType='source'
        src={require('../styles/icons/images.png')}
        dir={sourceDir}
        onClick={ () => selectDir('source') }
      />

      <DiskDirSelect 
        src={require('../styles/icons/disk.png')}
        dirType='target'
        dir={targetDir}
        onClick={ () => selectDir('target') }
      />

    </div>
  )
}

const _s = {
  'text-align': 'center'
}

