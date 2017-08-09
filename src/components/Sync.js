import React from 'react';
import {
  sync
} from '../nodeActions'

const Sync = ({filesToSync}) => {
  let files = {
    drive: Array.from(filesToSync.drive),
    disk: Array.from(filesToSync.disk)
  }
  return <button onClick={ () => sync(files) }>S~Y~N~C</button>
}

export default Sync