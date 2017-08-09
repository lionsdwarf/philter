import React from 'react'
import ImgPreview from './ImgPreview'
import ImgSyncControl from './ImgSyncControl'

const ImgNavItems = ({sourceJpgs, thumbFileNames, toggleSync}) => {
  return (
    <div>
      {
        sourceJpgs.map(
          fileName => <div>
            <ImgPreview 
              fileName={fileName}
              thumbExists={thumbFileNames.has(fileName)}
            />
            <ImgSyncControl 
              toggleSync={toggleSync}
              syncType='drive'
              fileName={fileName}
            />
            <ImgSyncControl 
              toggleSync={toggleSync}
              syncType='disk'
              fileName={fileName}
            />
          </div>
        )
      }
    </div>
  )
}

export default ImgNavItems