import React from 'react'
import ImgPreview from './ImgPreview'
import StagedDiskTargets from './StagedDiskTargets'
import StagedDriveTargets from './StagedDriveTargets'
import '../styles/components/ImgNavItems.css'

export default ({
  sourceJpgs, 
  thumbFileNames, 
  // diskTargetContents, 
  // driveTargetContents, 
  filesToSync, 
  setMainImg, 
  sourceDir, 
  thumbsSourceDir,
  devEnv,
  // driveTargetDirName,
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
          filesToSync.disk[fileName] && <StagedDiskTargets 
            stagedTargets={filesToSync.disk[fileName]}
            // existsInTarget={ diskTargetContents.has(fileName) }
          />
        }

        {
          filesToSync.drive[fileName] && <StagedDriveTargets 
            stagedTargets={filesToSync.drive}
            // existsInTarget={ driveTargetContents.has(fileName) }
          />
        }

      </div>
    )
  }
</span>

