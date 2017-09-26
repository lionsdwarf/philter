import React from 'react'

export default ({
  stagedTargets,
  unstageDir,
  fileName,
  writeSuccesses,
}) => {
 
  let targets = []

  stagedTargets.forEach(
    (target, i) => {
      console.log(writeSuccesses)
      targets.push(
        <div key={i}>
          <span onClick={ () => unstageDir('disk', target, fileName) } >{target}</span>
          <span>{writeSuccesses[target] && writeSuccesses[target].has(fileName) ? '+' : '-'}</span>
        </div>
      )
    }
  )

  return <div>{targets}</div>
}