import React from 'react';

const DriveDirSelect = ({targetDirs, onChange}) => {
  return (
    <div>
      {
        targetDirs.length > 0 &&
        targetDirs.map( (dir, i) => {
          return <div key={i}>{dir.name}</div>
        })
      }
    </div>
  )
}

export default DriveDirSelect