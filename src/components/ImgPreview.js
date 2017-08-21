import React from 'react'

const ImgPreview = ({fileName, thumbExists, thumbsSourceDir, devEnv, setMainImg}) => {
  let src
  if (devEnv && thumbExists) {
    src = require('../../.thumbnails/' + fileName)
  } else {
    src = `../${thumbsSourceDir}${fileName}`
  }

  return (
    <div>
      {
        thumbExists && <img src={src}/>
      }
      <span>{fileName}</span>
    </div>
  )
}

export default ImgPreview