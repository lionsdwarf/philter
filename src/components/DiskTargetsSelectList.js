import React from 'react'

export default ({
  filesToSync, 
  unstagedTargets, 
  mainImg, 
  stageDirToSync,
  targetContents,
}) => {
  
  const fileExistsInTarget = dir => {
    return !targetContents[dir].has(mainImg)
  }

  return (
    <div>

      {
        mainImg && unstagedTargets && unstagedTargets.length > 0 && unstagedTargets.map(
          (dir, i) => {
            return fileExistsInTarget(dir) ?
              <div key={i} onClick={ () => stageDirToSync(mainImg, dir) }>
                <div>{dir}</div>
              </div>
              :
              <div style={{opacity: 0.3}}>{dir}</div>
          }
        )
      }

    </div>
  )

}
