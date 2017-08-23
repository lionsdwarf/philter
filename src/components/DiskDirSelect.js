import React from 'react';

export default ({dirType, src, dir, onClick}) => {
  return (
    <div onClick={ onClick } style={_s.DiskDirSelect}>
      <img src={src} style={_s.img}/>
      {
        dir ?
          <div>{dir}</div>
          :
          <div>{`${dirType} folder`}</div>
      }
    </div>
  )
}

const _s = {
  DiskDirSelect: {
    cursor: 'pointer',
    display: 'inline-block',
    'text-align': 'center',
    margin: '40px 80px',
  },
  img: {
    width: 80
  }
}