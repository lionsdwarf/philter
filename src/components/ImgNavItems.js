import React from 'react'
import ImgPreview from './ImgPreview'
import ImgSyncControl from './ImgSyncControl'

const ImgNavItems = ({sourceJpgs, thumbMappings, toggleSync}) => {
  return (
    <div>
      {
        sourceJpgs.map(
          (fileName, i) => <div key={i}>
            <ImgPreview 
              fileName={fileName}
              thumbName={thumbMappings[fileName]}
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