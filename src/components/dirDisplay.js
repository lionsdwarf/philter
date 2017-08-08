import React from 'react'

const DirDisplay = ({source, target}) => {
  return (
    <div>
      {
        source && <div>{source}</div>
      }
      {
        target && <div>{target}</div>
      }
    </div>
  )
}

export default DirDisplay