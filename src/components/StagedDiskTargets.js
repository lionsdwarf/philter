import React from 'react'

export default ({
  stagedTargets,
  unstageDir,
  fileName,
  diskSuccesses,
  diskErrors,
}) => {
  console.log(diskErrors)
  const writeSuccess = target => diskSuccesses[target] && diskSuccesses[target].has(fileName)
  const writeError = target => diskErrors[target] && diskErrors[target].has(fileName)

  let targets = []
  stagedTargets.forEach(
    (target, i) => {
      targets.push(
        <div key={i}>
          <span style={{opacity: writeSuccess(target) && !writeError(target) ? '0.4' : '1'}} onClick={ () => unstageDir('disk', target, fileName) } >{target}</span>
          <span>{ writeSuccess(target) && !writeError(target) ? '+' : ''}</span>
        </div>
      )
    }
  )

  return <div>{targets}</div>
}