import React from 'react'
import '../styles/components/ImgPreview.css'

export default ({
  fileName, 
  thumbExists, 
  setMainImg, 
  sourceDir
}) => {

  return (
    <div onClick={ () => {setMainImg(sourceDir, fileName)} } className='ImgPreview'>
      {
        thumbExists && <img src={`.thumbs/${fileName}`} alt='thumb' className='thumb'/>
      }
      <div className='fileName'>{fileName}</div>
    </div>
  )
}
