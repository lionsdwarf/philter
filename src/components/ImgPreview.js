import React from 'react'
import '../styles/components/ImgPreview.css'

export default ({
  fileName, 
  thumbExists, 
  thumbsSourceDir, 
  devEnv, 
  setMainImg, 
  sourceDir
}) => {

  let src = `${process.env.PUBLIC_URL}${fileName}`;

  // let src
  // if (devEnv && thumbExists) {
  //   src = require('../../.thumbnails/' + fileName)
  // } else {
  //   src = `../${thumbsSourceDir}${fileName}`
  // }

  return (
    <div onClick={ () => {setMainImg(sourceDir, fileName)} } className='ImgPreview'>
      {
        thumbExists && <img src={src} alt='thumb' className='thumb'/>
      }
      <div className='fileName'>{fileName}</div>
    </div>
  )
}
