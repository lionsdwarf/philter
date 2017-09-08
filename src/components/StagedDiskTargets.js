import React from 'react'

export default ({
  stagedTargets,
  fileName
}) => {
  let targets = []
    {
      stagedTargets.forEach(
        (target, i) => {
          targets.push(<div key={i}>{target}</div>)
        }
      )
    }
  return <div>{targets}</div>
}