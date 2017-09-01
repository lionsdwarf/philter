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
  diskTargetDirName,
  thumbsSourceDir,
  devEnv,
  driveTargetDirName,
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
          diskTargetDirName && <ImgSyncControl 
            toggleSync={toggleSync}
            target={diskTargetDirName}
            fileName={fileName}
            existsInTarget={ diskTargetContents.has(fileName) }
          />
        }

        {
          driveTargetDirName && <ImgSyncControl 
            toggleSync={toggleSync}
            target={driveTargetDirName}
            fileName={fileName}
            existsInTarget={ driveTargetContents.has(fileName) }
          />
        }

      </div>
    )
  }
</span>

