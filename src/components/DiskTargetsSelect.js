import React from 'react'
import SVGIcon from './SVGIcon'
import '../styles/components/DirSelect.css'
import { selectTargetDir } from '../nodeActions'
import { downloadFolderIcon } from '../styles/svgPaths'

export default ({
  targets, 
}) => <div className='dirSelect'>
  
  <div onClick={selectTargetDir} className='iconWrapper'>
    <SVGIcon 
      paths={downloadFolderIcon}
      fill='hotpink'
    />
  </div>

</div>
