import React from 'react'
import ImgPreview from './ImgPreview'
import StagedDiskTargets from './StagedDiskTargets'
import StagedDriveTargets from './StagedDriveTargets'
import '../styles/components/ImgNavItems.css'

export default ({
  sourceJpgs, 
  thumbFileNames, 
  unstageDir,
  // diskTargetContents, 
  // driveTargetContents, 
  filesToSync, 
  setMainImg, 
  sourceDir, 
  thumbsSourceDir,
  devEnv,
}) => <div className='ImgNavItems'>
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
            fileName={fileName}
            unstageDir={unstageDir}
            // existsInTarget={ diskTargetContents.has(fileName) }
          />
        }

        {
          filesToSync.drive[fileName] && <StagedDriveTargets 
            stagedTargets={filesToSync.drive[fileName]}
            fileName={fileName}
            unstageDir={unstageDir}
            // existsInTarget={ driveTargetContents.has(fileName) }
          />
        }

      </div>
    )
  }
</div>

