import React from 'react'
import SVGIcon from './SVGIcon'
import DirLabel from './DirLabel'
import '../styles/components/DiskDirSelect.css'

export default ({
  dirType, 
  svgPaths, 
  dir, 
  onClick, 
  imgStyle, 
  svgFill,
  buttonLabel,
}) => {
  return (
    <div className='DiskDirSelect'>
      
      <div onClick={onClick} className='iconWrapper'>
        <SVGIcon 
          paths={svgPaths}
          fill={svgFill}
        />
      </div>

      {
        dir ?
          <DirLabel dir={dir}/>
          :
          <div className='buttonLabel'>{buttonLabel}</div>
      }

    </div>
  )
}
