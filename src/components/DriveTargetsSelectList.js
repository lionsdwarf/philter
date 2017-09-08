import React, {Component} from 'react'

export default ({
  unstagedTargets, 
  mainImg, 
  stageDirToSync,
}) => {
  return (
    <div>
    
      {
        mainImg && unstagedTargets && unstagedTargets.length > 0 &&
          unstagedTargets.map(
            (dir, i) => <div key={i} onClick={ () => stageDirToSync(mainImg, dir) }>{dir.name}</div>
          )
          
      }

    </div>
  )
}