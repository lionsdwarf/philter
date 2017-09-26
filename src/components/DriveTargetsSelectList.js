import React from 'react'

export default ({
  unstagedTargets, 
  mainImg, 
  stageDirToSync,
  targetContents,
}) => {

  const fileExistsInTarget = targetId => targetContents[targetId].has(mainImg)

  return (
    <div>
    
      {
        mainImg && unstagedTargets && unstagedTargets.length > 0 &&
          unstagedTargets.map(
            (dir, i) => {
              return fileExistsInTarget(dir.id) ?
                <div key={i} style={{opacity: 0.4}}>{dir.name}</div>
                :
                <div key={i} onClick={ () => stageDirToSync(mainImg, dir) }>{dir.name}</div>
            }
          )
      }

    </div>
  )
}