import React from 'react';

const DiskDirSelect = ({dirType, src, dir, onClick}) => {
  return (
    <div onClick={ onClick } style={_s.DiskDirSelect}>
      <img src={src} style={_s.img}/>
      {
        dir ?
          <div>{dir}</div>
          :
          <div>{`Select ${dirType} folder`}</div>
      }
    </div>
  )
}

export default DiskDirSelect

const _s = {
  DiskDirSelect: {
    cursor: 'pointer'
  },
  img: {
    width: 80
  }
}