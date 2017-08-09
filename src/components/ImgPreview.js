import React from 'react'

const ImgPreview = ({fileName, thumbExists}) => {
  let thumbSrc = require('../../.thumbnails/' + fileName)
  return (
    <div>
      {
        thumbExists && <img src={thumbSrc}/>
      }
      <span>{fileName}</span>
    </div>
  )
}

export default ImgPreview