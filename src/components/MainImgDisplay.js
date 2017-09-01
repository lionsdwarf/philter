import React from 'react'

export default ({mainImgPath, devEnv}) => {

  let src
  if (mainImgPath) {
    if (devEnv) {
      src = require('../devPublic/PB060521.JPG')
    } else {
      src = mainImgPath
    }
  }

  return (
    <span> 
      <img src={src}/>
    </span>
  )
}

