import React from 'react'
import ImgControlItem from '../components/ImgControlItem'


const ImgControlList = ({sourceJpgs, thumbFileNames, thumbsDir}) => {
  // console.log('thumbsDir + fileName', thumbFileNames)
  
  return (
    <div>
      {
        sourceJpgs.map(
          fileName => {
            // console.log('thumbsDir + fileName', thumbFileNames.has(fileName) && thumbsDir + fileName)
            return (<ImgControlItem 
                          fileName={fileName}
                          thumbExists={thumbFileNames.has(fileName)}
                          thumbsDir={thumbsDir}
                        />)
          }
        )
      }
    </div>
  )
}

export default ImgControlList