import React from 'react'
import DiskTargetsSelectList from './DiskTargetsSelectList'
import DiskTargetsSelect from './DiskTargetsSelect'
import DiskTargetsList from './DiskTargetsList'

export default ({
  targets,
  mainImg,
}) => <span>

  <DiskTargetsSelect/>

  {
    mainImg ?
      <DiskTargetsSelectList/>
      :
      <DiskTargetsList targets={targets}/>
  }

</span>

