import React from 'react'

export default ({
  stagedTargets,
  unstageDir,
  fileName,
  writeSuccesses,
  writeErrors,
  dirType,
}) => {

  const writeSuccess = target => writeSuccesses[target] && writeSuccesses[target].has(fileName)
  const writeError = target => writeErrors[target] && writeErrors[target].has(fileName)

  let targets = []
  stagedTargets.forEach(
    (target, i) => {
      const targetIdentifier = target.id || target
      const targetName = target.name || target
      targets.push(
        <div key={i}>
          <span style={{opacity: writeSuccess(targetIdentifier) && !writeError(targetIdentifier) ? '0.4' : '1'}} onClick={ () => unstageDir(dirType, target, fileName) } >{targetName}</span>
          <span>{ writeSuccess(targetIdentifier) && !writeError(targetIdentifier) ? '+' : ''}</span>
        </div>
      )
    }
  )

  return <div>{targets}</div>
}