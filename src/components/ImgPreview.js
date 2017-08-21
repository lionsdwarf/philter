import React from 'react'

const ImgPreview = ({fileName, thumbName}) => {
    console.log('e', fileName)
    console.log('e', thumbName)
  let req = require.context('../../.thumbnails/', false, /\.(jpg)$/)
  let thumbSrc
  if (thumbName) {
    console.log(req.keys())
    thumbSrc = req('./' + thumbName)
  }
  return (
    <div>
      {
        thumbName && <img src={thumbSrc}/>
      }
      <span>{fileName}</span>
    </div>
  )

}

export default ImgPreview