import React from 'react'

export default ({
  filesToSync, 
  unstagedTargets, 
  mainImg, 
  stageDirToSync,
  targetContents,
}) => {
  
  const fileExistsInTarget = dir => targetContents[dir].has(mainImg)

  return (
    <div>

      {
        mainImg && unstagedTargets && unstagedTargets.length > 0 && unstagedTargets.map(
          (dir, i) => {
            return fileExistsInTarget(dir) ?
              <div key={i} style={{opacity: 0.3}}>{dir}</div>
              :
              <div key={i} onClick={ () => stageDirToSync(mainImg, dir) }>
                <div>{dir}</div>
              </div>
          }
        )
      }

    </div>
  )

}
