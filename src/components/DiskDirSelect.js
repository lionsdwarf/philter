import React from 'react';
import '../styles/components/DiskDirSelect.css'

const iconSize = 80

export default ({dirType, svgPaths, dir, onClick, imgStyle}) => {
  return (
    <div onClick={onClick} className='DiskDirSelect'>
      <svg width={iconSize} height={iconSize} viewBox='0 0 20 20'>
        {
          svgPaths.map( (path, i) => <path fill='lightgreen' key={i} d={path}></path> )
        }
      </svg>
      {
        dir ?
          <div>{dir}</div>
          :
          <div>{`${dirType} folder`}</div>
      }
    </div>
  )
}
