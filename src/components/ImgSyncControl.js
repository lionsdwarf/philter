import React from 'react'

export default ({toggleSync, fileName, syncType, existsInTarget}) => {
  return (
    <span>
      {
        existsInTarget ?
          <span>X</span>
          :
          <span>
            <input type='checkbox' onChange={ e => toggleSync(fileName, e.target.checked, syncType) }/>
            <span>{syncType}</span>
          </span>          
      }
    </span>
  )
}
