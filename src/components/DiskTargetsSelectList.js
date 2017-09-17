import React from 'react'

export default ({
  filesToSync, 
  unstagedTargets, 
  mainImg, 
  stageDirToSync,
}) => <div>

  {
    mainImg && unstagedTargets && unstagedTargets.length > 0 &&
      unstagedTargets.map(
        (dir, i) => <div key={i} onClick={ () => stageDirToSync(mainImg, dir) }>
          <div>{dir}</div>
        </div>
      )
  }

</div>
