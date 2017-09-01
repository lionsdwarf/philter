import React from 'react'
import ImgPreview from './ImgPreview'
import ImgSyncControl from './ImgSyncControl'

export default ({
  sourceJpgs, 
  thumbFileNames, 
  diskTargetContents, 
  driveTargetContents, 
  toggleSync, 
  setMainImg, 
  sourceDir, 
  thumbsSourceDir,
  devEnv,
}) => {
  return (
    <span>
      {
        sourceJpgs.map( (fileName, i) => 

          <div key={i} style={_s}>

            <ImgPreview 
              fileName={fileName}
              thumbExists={thumbFileNames.has(fileName)}
              sourceDir={sourceDir}
              setMainImg={setMainImg}
              thumbsSourceDir={thumbsSourceDir}
              devEnv={devEnv}
            />

            <ImgSyncControl 
              toggleSync={toggleSync}
              syncType='disk'
              fileName={fileName}
              existsInTarget={ diskTargetContents.has(fileName) }
            />

            <ImgSyncControl 
              toggleSync={toggleSync}
              syncType='drive'
              fileName={fileName}
              existsInTarget={ driveTargetContents.has(fileName) }
            />

          </div>
        )
      }
    </span>
  )
}

const _s = {
  border: '1px solid',
  'border-bottom': '0px',
  'border-color': 'lightgrey',
  'border-radius': '5px',
  width: '290px',
}