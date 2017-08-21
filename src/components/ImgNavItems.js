import React from 'react'
import ImgPreview from './ImgPreview'
import ImgSyncControl from './ImgSyncControl'

const ImgNavItems = ({
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
    <div>
      {
        sourceJpgs.map(
          (fileName, i) => <div key={i}>
            <ImgPreview 
              fileName={fileName}
              thumbExists={thumbFileNames.has(fileName)}
              setMainImg={setMainImg}
              thumbsSourceDir={thumbsSourceDir}
              devEnv={devEnv}
            />
            <ImgSyncControl 
              toggleSync={toggleSync}
              syncType='drive'
              fileName={fileName}
              existsInTarget={ driveTargetContents.has(fileName) }

            />
            <ImgSyncControl 
              toggleSync={toggleSync}
              syncType='disk'
              fileName={fileName}
              existsInTarget={ diskTargetContents.has(fileName) }
            />
          </div>
        )
      }
    </div>
  )
}

export default ImgNavItems