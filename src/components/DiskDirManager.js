import React from 'react';
import DiskDirSelect from './DiskDirSelect'
import {
  selectDir
} from '../nodeActions'
import {
  imgFile,
  downloadFolder,
} from '../styles/svgPaths'

export default ({sourceDir, targetDir}) => {
  return (
    <div style={_s.DiskDirManager}>
      
      <DiskDirSelect 
        dirType='source'
        svgPaths={imgFile}
        dir={sourceDir}
        onClick={ () => selectDir('source') }
      />

      <DiskDirSelect 
        svgPaths={downloadFolder}
        dirType='target'
        dir={targetDir}
        onClick={ () => selectDir('target') }
      />

    </div>
  )
}

const _s = {
  DiskDirManager: {
  'text-align': 'center',
  },
  targetImgStyle: {
    transform: 'rotate(90deg)'
  }
}

