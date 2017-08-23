import React from 'react'

const ImgPreview = ({
  fileName, 
  thumbExists, 
  thumbsSourceDir, 
  devEnv, 
  setMainImg, 
  sourceDir
}) => {
  
  let src
  if (devEnv && thumbExists) {
    src = require('../../.thumbnails/' + fileName)
  } else {
    src = `../${thumbsSourceDir}${fileName}`
  }

  return (
    <div onClick={ () => setMainImg(sourceDir, fileName) }>
      {
        thumbExists && <img src={src}/>
      }
      <span>{fileName}</span>
    </div>
  )
}

export default ImgPreview