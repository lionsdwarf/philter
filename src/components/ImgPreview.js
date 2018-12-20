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

  // if dev environment, pull thumbs from public folder, otherwise thumbs live within the build/ folder
  let src
  if (devEnv && thumbExists) {
    src = `${process.env.PUBLIC_URL}/.thumbs/${fileName}`;
  } else {
    src = `.thumbs/${fileName}`;
  }

  return (
    <div onClick={ () => {setMainImg(sourceDir, fileName)} } className='ImgPreview'>
      {
        thumbExists && <img src={src} alt='thumb' className='thumb'/>
      }
      <div className='fileName'>{fileName}</div>
    </div>
  )
}
