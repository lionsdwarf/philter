import React from 'react'
import ImgPreview from './ImgPreview'
import StagedTargets from './StagedTargets'
import '../styles/components/ImgNavItems.css'

export default ({
  sourceJpgs, 
  thumbFileNames, 
  filesToSync, 
  writeStatus, 
  sourceDir, 
  thumbsSourceDir,
  devEnv,
  unstageDir,
  setMainImg, 
}) => <div style={{ 'display': sourceJpgs.length > 0 ? 'block' : 'none' }} className='ImgNavItems'>
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
          filesToSync.disk[fileName] && <StagedTargets 
            stagedTargets={filesToSync.disk[fileName]}
            fileName={fileName}
            unstageDir={unstageDir}
            writeSuccesses={writeStatus.diskSuccesses}
            writeErrors={writeStatus.diskErrors}
            dirType='disk'
          />
        }

        {
          filesToSync.drive[fileName] && <StagedTargets 
            stagedTargets={filesToSync.drive[fileName]}
            fileName={fileName}
            unstageDir={unstageDir}
            writeSuccesses={writeStatus.driveSuccesses}
            writeErrors={writeStatus.driveErrors}
            dirType='drive'
          />
        }

      </div>
    )
  }
</div>

