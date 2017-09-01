import React from 'react'
import ImgPreview from './ImgPreview'
import ImgSyncControl from './ImgSyncControl'
import '../styles/components/ImgNavItems.css'

export default ({
  sourceJpgs, 
  thumbFileNames, 
  diskTargetContents, 
  driveTargetContents, 
  toggleSync, 
  setMainImg, 
  sourceDir, 
  diskTargetDir,
  thumbsSourceDir,
  devEnv,
  driveTargetDir,
}) => <span className='ImgNavItems'>
  {
    sourceJpgs.map( (fileName, i) => 

      <div key={i} className='imgNavItem'>

        <ImgPreview 
          fileName={fileName}
          thumbExists={thumbFileNames.has(fileName)}
          sourceDir={sourceDir}
          setMainImg={setMainImg}
          thumbsSourceDir={thumbsSourceDir}
          devEnv={devEnv}
        />

        {
          diskTargetDir && <ImgSyncControl 
            toggleSync={toggleSync}
            target={diskTargetDir}
            fileName={fileName}
            existsInTarget={ diskTargetContents.has(fileName) }
          />
        }

        {
          driveTargetDir && <ImgSyncControl 
            toggleSync={toggleSync}
            target={driveTargetDir}
            fileName={fileName}
            existsInTarget={ driveTargetContents.has(fileName) }
          />
        }

      </div>
    )
  }
</span>

