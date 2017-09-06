import React from 'react'

export default ({sourceDir, mainImg, devEnv}) => {

  let src
  if (mainImg) {
    if (devEnv) {
      src = require('../devPublic/PB060521.JPG')
    } else {
      src = `${sourceDir}/${mainImg}`
    }
  }

  return (
    <span> 
      <img src={src}/>
    </span>
  )
}

