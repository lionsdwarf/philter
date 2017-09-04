import React from 'react'

const iconSize = 80

const generateSVGContents = (paths, fill) => paths.map( 
  (path, i) => 
    // typeof(path) === 'string' ?
      <path fill={fill} key={i} d={path}></path>
      // :
      // <line fill="none" stroke={fill} strokeWidth={path.strokeWidth} strokeLinecap={path.strokeLinecap} strokeMiterlimit={path.strokeMiterlimit} x1={path.x1} y1={path.y1} x2={path.x2} y2={path.y2}/>
)

export default ({paths, fill, width, height}) => {
  const svgContents = typeof(paths) === 'string' ?
    <path fill={fill} d={paths}></path>
    :
    generateSVGContents(paths, fill)
  return (
    <svg width={width || iconSize} height={height || iconSize} viewBox='0 0 20 20'>{svgContents}</svg>
  )
}