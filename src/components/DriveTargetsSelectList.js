import React, {Component} from 'react'

const filterStagedTargets = (mainImg, targets, filesToSync) => {
  return targets
}

export default ({
  filesToSync, 
  targets, 
  mainImg, 
  stageDirToSync,
}) => {
  
  const unstagedTargets = filterStagedTargets(mainImg, targets, filesToSync)

  return (
    <div>
    
      {
        mainImg && unstagedTargets && unstagedTargets.length > 0 &&
          unstagedTargets.map(
            (dir, i) => <div key={i} onClick={ () => stageDirToSync(mainImg, dir.id) }>{dir.name}</div>
          )
          
      }

    </div>
  )
}