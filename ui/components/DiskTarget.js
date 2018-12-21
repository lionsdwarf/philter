import React from 'react'
import DiskTargetsSelectList from '../containers/DiskTargetsSelectList'
import DiskTargetsSelect from './DiskTargetsSelect'
import DiskTargetsList from './DiskTargetsList'

export default ({
  targets,
  mainImg,
}) => <div>

  <DiskTargetsSelect/>

  {
    mainImg ?
      <DiskTargetsSelectList/>
      :
      <DiskTargetsList targets={targets}/>
  }

</div>

