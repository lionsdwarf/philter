import React from 'react'
import DiskDirSelect from './DiskDirSelect'
import {
  selectDir
} from '../nodeActions'
import {
  downloadFolder,
} from '../styles/svgPaths'

export default ({targetDir}) => {

  return <DiskDirSelect 
    svgPaths={downloadFolder}
    dirType='target'
    dir={targetDir}
    svgFill={'hotpink'}
    buttonLabel={'Local Destination'}
    onClick={ () => selectDir('target') }
  />

}