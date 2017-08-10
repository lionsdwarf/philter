import React from 'react';

const DriveDirSelect = ({dirs, driveDefaultDirSelect}) => {
  return (
    <div>
      {
        dirs.length > 0 &&
        <select onChange={ (event) => driveDefaultDirSelect(event.target.value) }>
          {
            dirs.map( (dir, i) => {
              return <option key={i} value={dir.id}>{dir.name}</option>
            })
          }
        </select>
        
      }
    </div>
  )
}

export default DriveDirSelect