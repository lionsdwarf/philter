import React, { Component } from 'react';

export default ({
  driveDirName, 
  createDriveDir, 
  setDirName, 
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

</div>

