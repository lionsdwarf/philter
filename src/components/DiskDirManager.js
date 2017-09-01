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
        svgPaths={downloadFolder}
        dirType='target'
        dir={targetDir}
        svgFill={'hotpink'}
        buttonLabel={'DESTINATION'}
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

