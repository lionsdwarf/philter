import React from 'react'

export default ({
  stagedTargets,
  unstageDir,
  fileName,
}) => {
  let targets = []
    {
      stagedTargets.forEach(
        (target, i) => {
          targets.push(<div key={i} onClick={ () => unstageDir('disk', target, fileName) } >{target}</div>)
        }
      )
    }
  return <div>{targets}</div>
}