import React from 'react'

const ImgControlItem = ({fileName, thumbExists}) => {
  console.log('../../.thumbnails/' + fileName)
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

export default ImgControlItem