import React from 'react'
import DirLabel from './DirLabel'
import SVGIcon from './SVGIcon'
import '../styles/components/DirSelect.css'
import { imgFileIcon } from '../styles/svgPaths'
import { selectSourceDir } from '../nodeActions'

export default () => <div className='dirSelect'>
  
  <div onClick={selectSourceDir} className='iconWrapper'>
    <SVGIcon 
      paths={imgFileIcon}
      fill='black'
    />
  </div>

</div>
