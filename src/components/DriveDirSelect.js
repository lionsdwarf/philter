import React from 'react';

const DriveDirSelect = ({dirs}) => {
  console.log('p', dirs)

  return (
    <div>
      {
        dirs.length > 0 &&
        <select onChange={ (event) => {console.log('e',event)} }>
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