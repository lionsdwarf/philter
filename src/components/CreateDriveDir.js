import React, { Component } from 'react';

const CreateDriveDir = ({driveDirName, createDriveDir, setDirName}) => {

  return  (
    <div>

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
  )

}

export default CreateDriveDir