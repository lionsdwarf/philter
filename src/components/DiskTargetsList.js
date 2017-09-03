import React, {Component} from 'react'
import DirLabel from './DirLabel'

export default ({targets}) => <div>
  
  {
    targets && targets.map(
      (dir, i) => <DirLabel key={i} dir={dir}/>
    )
  }

</div>