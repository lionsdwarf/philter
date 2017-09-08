import React from 'react'

export default ({
  stagedTargets,
}) => {
  let targets = []
  stagedTargets.forEach(
    (target, i) => {
      console.log(target)
      targets.push(<div key={i}>{target.name}</div>)
    }
  )
  return (<div>{targets}</div>)
}