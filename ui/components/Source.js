import React from 'react'
import SourceSelect from './SourceSelect'
import DirLabel from './DirLabel'

export default ({sourceDir}) => <div>

  <SourceSelect/>

  {
    sourceDir ?
      <DirLabel dir={sourceDir}/>
      :
      <div className='buttonLabel'>Source Files</div>
  }

</div>
