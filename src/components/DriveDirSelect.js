import React from 'react';

const DriveDirSelect = ({dirs}) => {
  return (
    <select onChange={ (event) => {console.log('e',event)} }>
      {
        dirs && dirs.map( (dir, i) => {
          <option value={dir.id}>{dir.name}</option>
        })
      }
    </select>
  )
}

export default DriveDirSelect