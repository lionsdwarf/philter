import React from 'react';
import {
  sync
} from '../nodeActions'

const Sync = ({filesToSync, defaultDirId}) => {
  let files = {
    drive: Array.from(filesToSync.drive),
    disk: Array.from(filesToSync.disk)
  }
  return <button onClick={ () => sync(files, defaultDirId) }>S~Y~N~C</button>
}

export default Sync