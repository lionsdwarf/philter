import React from 'react'

const ImgPreview = ({fileName, thumbName}) => {
    console.log('e', fileName)
    console.log('e', thumbName)
  // let req = require.context('../../.thumbnails/', false, /\.(jpg)$/)
  let thumbSrc
  if (thumbName) {
    // thumbSrc = req('./' + thumbName)
    thumbSrc = '../.thumbnails/' + thumbName
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