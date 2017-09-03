import React from 'react'
import DiskDirSelect from './DiskDirSelect'
import {
  selectDir
} from '../nodeActions'
import {
  imgFile,
} from '../styles/svgPaths'

export default ({sourceDir}) => <DiskDirSelect 
  dirType='source'
  svgPaths={imgFile}
  svgFill={'black'}
  dir={sourceDir}
  buttonLabel={'Storage Source'}
  onClick={ () => selectDir('source') }
/>
