import React from 'react';
import {
  sync
} from '../nodeActions'

export default ({filesToSync}) => <button onClick={ () => sync(filesToSync) }>SYNC</button>
