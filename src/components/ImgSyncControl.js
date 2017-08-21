import React from 'react'

const ImgSyncControl = ({toggleSync, fileName, syncType, existsInTarget}) => {
  return (
    <div>
      {
        existsInTarget ?
          <span>X</span>
          :
          <input type='checkbox' onChange={ e => toggleSync(fileName, e.target.checked, syncType) }/>
      }
    </div>
  )
}

export default ImgSyncControl