import React from 'react'
import ImgControlItem from '../components/ImgControlItem'


const ImgControlList = ({sourceJpgs, thumbFileNames}) => {
  return (
    <div>
      {
        sourceJpgs.map(
          fileName => <ImgControlItem 
            fileName={fileName}
            thumbExists={thumbFileNames.has(fileName)}
          />
        )
      }
    </div>
  )
}

export default ImgControlList