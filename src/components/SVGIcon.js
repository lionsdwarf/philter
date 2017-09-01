import React from 'react'
const iconSize = 80
  
export default ({paths, fill, width, height}) => {
  return (
    <svg width={width || iconSize} height={height || iconSize} viewBox='0 0 20 20'>
      {
        paths.map( (path, i) => <path fill={fill} key={i} d={path}></path> )
      }
    </svg>
  )
}