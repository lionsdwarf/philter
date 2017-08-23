import React from 'react';

const DriveDirSelect = ({targetDirs, onChange}) => {
  return (
    <div>
      {
        targetDirs.length > 0 &&
        <select onChange={onChange}>
          {
            targetDirs.map( (dir, i) => {
              return <option key={i} value={dir.id}>{dir.name}</option>
            })
          }
        </select>
        
      }
    </div>
  )
}

export default DriveDirSelect