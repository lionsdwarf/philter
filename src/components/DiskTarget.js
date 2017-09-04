import React from 'react'
import DiskTargetsSelect from './DiskTargetsSelect'
import DiskTargetsList from './DiskTargetsList'

export default ({targets}) => <div>

  <DiskTargetsSelect/>

  <DiskTargetsList targets={targets}/>

</div>

