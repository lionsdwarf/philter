import React from 'react'

const ImgSyncControl = ({toggleSync, fileName, syncType}) => {
  return (
    <div>
      <input type='checkbox' onChange={ e => toggleSync(fileName, e.target.checked, syncType) }/>
    </div>
  )
}

export default ImgSyncControl