import React, {Component} from 'react'
import DirLabel from './DirLabel'

export default ({targets}) => <div>
  
  {
    targets && targets.length > 0 ?
      targets.map(
        (dir, i) => <DirLabel key={i} dir={dir}/>
      )
      :
      <div>Local Destination</div>
      
  }

</div>