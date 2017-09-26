import React from 'react'
import ImgPreview from './ImgPreview'
import StagedDiskTargets from './StagedDiskTargets'
import StagedDriveTargets from './StagedDriveTargets'
import '../styles/components/ImgNavItems.css'

export default ({
  sourceJpgs, 
  thumbFileNames, 
  filesToSync, 
  diskWriteSuccesses, 
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
          filesToSync.disk[fileName] && <StagedDiskTargets 
            stagedTargets={filesToSync.disk[fileName]}
            fileName={fileName}
            unstageDir={unstageDir}
            writeSuccesses={diskWriteSuccesses}
          />
        }

        {
          filesToSync.drive[fileName] && <StagedDriveTargets 
            stagedTargets={filesToSync.drive[fileName]}
            fileName={fileName}
            unstageDir={unstageDir}
          />
        }

      </div>
    )
  }
</div>

