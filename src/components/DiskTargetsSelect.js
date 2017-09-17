import React from 'react'
import '../styles/components/DirSelect.css'
import folderDownload from '../static/svg/folderDownload.svg'
import { selectTargetDir } from '../nodeActions'

export default ({
  targets, 
}) => <div className='dirSelect'>
  
  <div onClick={selectTargetDir} className='iconWrapper'>
    <img src={folderDownload} alt='disk target'/>
  </div>

</div>
