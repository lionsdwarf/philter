import React, { Component } from 'react';
import { caratIcon } from '../styles/svgPaths'
import SVGIcon from './SVGIcon'

export default ({
  driveDirName, 
  createDriveDir, 
  setDirName, 
  toggleIsCreate
}) => <div>

  <input 
    type='text' 
    value={driveDirName} 
    onChange={setDirName}
  />

  <button 
    disabled={!driveDirName} 
    onClick={createDriveDir}
  >Create Dir</button>

  <div onClick={toggleIsCreate}>
    <SVGIcon
      paths={caratIcon}
      fill='black'
    />
  </div>

</div>

