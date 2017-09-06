import React, {Component} from 'react'
import DirLabel from './DirLabel'

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
            (dir, i) => <div onClick={ () => stageDirToSync(mainImg, dir) }>
              <DirLabel key={i} dir={dir}/>
            </div>
          )
          
      }

    </div>
  )
}