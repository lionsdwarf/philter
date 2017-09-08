import React from 'react'

export default ({
  stagedTargets,
  unstageDir,
  fileName
}) => {
  let targets = []
  let counter = 0
  stagedTargets.forEach(
    target => {
      targets.push(<div key={counter} onClick={ () => unstageDir('drive', target, fileName) }>{target.name}</div>)
      counter++
    }
  )
  return <div>{targets}</div>
}