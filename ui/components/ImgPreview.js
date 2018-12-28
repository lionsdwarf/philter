import React from 'react'
import '../styles/components/ImgPreview.css'

export default ({
  fileName, 
  thumbExists, 
  setMainImg, 
  sourceDir,
  jpgsMetadata,
}) => {

  return (
    <div onClick={ () => {setMainImg(sourceDir, fileName, jpgsMetadata[fileName])} } className='ImgPreview'>
      {
        thumbExists && <img src={`.thumbs/${fileName}`} alt='thumb' className='thumb'/>
      }
      <div className='fileName'>{fileName}</div>
    </div>
  )
}
