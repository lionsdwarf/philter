import React from 'react'

const ImgControlItem = ({fileName, thumbExists, thumbsDir}) => {
  let thumbSrc = require('/Users/sparklemotion/Development/philter-reactified/.thumbnails/' + fileName)
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