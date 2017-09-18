import React from 'react'

export default ({
  fileName, 
  thumbExists, 
  thumbsSourceDir, 
  devEnv, 
  setMainImg, 
  sourceDir
}) => {
  
  let src
  if (devEnv && thumbExists) {
    // src = require('../../.thumbnails/' + fileName)
  } else {
    src = `../${thumbsSourceDir}${fileName}`
  }

  return (
    <div onClick={ () => setMainImg(sourceDir, fileName) } style={_s.ImgPreview}>
      {
        thumbExists && <img src={src} alt='thumb'/>
      }
      <div style={_s.fileName}>{fileName}</div>
    </div>
  )
}

const _s = {
  ImgPreview: {
    padding: '20px',
    display: 'inline-block',
  },
  fileName: {
    'padding-top': '10px',
  }
}
