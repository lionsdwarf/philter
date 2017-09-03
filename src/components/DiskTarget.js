import React from 'react'
import DiskDirSelect from './DiskDirSelect'
import {
  selectDir
} from '../nodeActions'
import {
  downloadFolder,
} from '../styles/svgPaths'

export default ({targets}) => <DiskDirSelect 
  svgPaths={downloadFolder}
  dirType='target'
  targets={targets}
  svgFill={'hotpink'}
  buttonLabel={'Local Destination'}
  onClick={ () => selectDir('target') }
/>
