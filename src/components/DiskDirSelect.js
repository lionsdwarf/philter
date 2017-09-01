import React from 'react'
import SVGIcon from './SVGIcon'
import '../styles/components/DiskDirSelect.css'

export default ({dirType, svgPaths, dir, onClick, imgStyle, svgFill}) => {
  return (
    <div onClick={onClick} className='DiskDirSelect'>
      
      <SVGIcon 
        paths={svgPaths}
        fill={svgFill}
      />

      {
        dir ?
          <div>{dir}</div>
          :
          <div>{`${dirType} folder`}</div>
      }

    </div>
  )
}
